import fs from 'fs';
import path from 'path';
import type {
	FrontendOrder,
	CreateOrderDTO,
	OrderItem,
	BackendOffer
} from '../types/order';
import { isDiscountValid, calculateDiscountedPrice } from './discount';
import { DISCOUNT_PERCENT } from '../config';

const OFFERS_PATH = path.join(__dirname, '../../data/offers.json');
let offersCache: BackendOffer[] = [];

const FILLING_ALIASES: Record<string, string> = {};

const OPTIONAL_ALIASES: Record<string, string> = {};

const WEIGHT_SCALE: Record<number, number> = {
	1.5: 0,
	3: 0.5,
	5: 1.5
};

function resolveAlias(aliases: Record<string, string>, name: string): string {
	return aliases[name] || name;
}

function getOffers(): BackendOffer[] {
	if (offersCache.length === 0) {
		try {
			const data = fs.readFileSync(OFFERS_PATH, 'utf-8');
			offersCache = JSON.parse(data);
		} catch {
			offersCache = [];
		}
	}
	return offersCache;
}

function calculateUnitPrice(
	offer: BackendOffer,
	weightValue: number,
	fillingMap: Record<string, boolean>,
	optionalMap: Record<string, boolean>
): number {
	const weightMultiplier = weightValue ? WEIGHT_SCALE[weightValue] || 0 : 0;

	const unitPrice = offer.price * (1 + weightMultiplier);

	const fillingsPrice = Object.entries(fillingMap || {})
		.filter(([, isSelected]) => isSelected)
		.reduce((sum, [name]) => {
			const fillingItem = offer.filling.find(
				f => f.name === resolveAlias(FILLING_ALIASES, name)
			);
			return sum + (fillingItem?.price || 0);
		}, 0);

	const optionalsPrice = Object.entries(optionalMap || {})
		.filter(([, isSelected]) => isSelected)
		.reduce((sum, [name]) => {
			const opt = offer.optionally.find(
				o => o.name === resolveAlias(OPTIONAL_ALIASES, name)
			);
			return sum + (opt?.price || 0);
		}, 0);

	return unitPrice + fillingsPrice + optionalsPrice;
}

export function calculateTotalPrice(order: FrontendOrder): number {
	const offers = getOffers();

	return order.shoppingCart.reduce(
		(sum: number, item: FrontendOrder['shoppingCart'][number]) => {
			const offer = offers.find(o => o.id === item.cakeId);

			if (!offer) {
				return sum + item.price * item.quantity;
			}

			const checkedWeight = item.weight.find(w => w.isChecked);
			const weightValue = checkedWeight?.weightValue || 0;

			const unitPrice = calculateUnitPrice(
				offer,
				weightValue,
				item.filling,
				item.optional
			);

			return sum + unitPrice * item.quantity;
		},
		0
	);
}

export function validateFinalSum(order: FrontendOrder): { valid: boolean; error?: string } {
	const originalPrice = calculateTotalPrice(order);

	if (order.finalSum > originalPrice) {
		return {
			valid: false,
			error: `Итоговая сумма (${order.finalSum}) больше расчётной (${originalPrice})`
		};
	}

	const expectedDiscountedPrice = calculateDiscountedPrice(originalPrice);
	const tolerance = 1;

	if (order.finalSum < expectedDiscountedPrice - tolerance) {
		return {
			valid: false,
			error: `Подделка цены: ожидалось минимум ${expectedDiscountedPrice}₽, получено ${order.finalSum}₽`
		};
	}

	return { valid: true };
}

export function mapFrontendOrderToDTO(order: FrontendOrder): CreateOrderDTO {
	const offers = getOffers();

	const items: OrderItem[] = order.shoppingCart.map(
		(item: FrontendOrder['shoppingCart'][number], index: number) => {
			const offer = offers.find(o => o.id === item.cakeId);
			const checkedWeight = item.weight.find(w => w.isChecked);
			const weight = checkedWeight?.weightValue || 0;

			const selectedFillings = Object.entries(item.filling || {})
				.filter(([, isSelected]) => isSelected)
				.map(([name]) => {
					const filling = offer?.filling.find(
						f => f.name === resolveAlias(FILLING_ALIASES, name)
					);
					return { name, price: filling?.price || 0 };
				});

			const selectedOptionals = Object.entries(item.optional || {})
				.filter(([, isSelected]) => isSelected)
				.map(([name]) => {
					const optional = offer?.optionally.find(
						o => o.name === resolveAlias(OPTIONAL_ALIASES, name)
					);
					return { name, price: optional?.price || 0 };
				});

			// Пересчитываем цену для безопасности
			const calculatedPrice = offer
				? calculateUnitPrice(
						offer,
						weight,
						item.filling,
						item.optional
				  ) * item.quantity
				: item.price * item.quantity;

			return {
				id: index + 1,
				name: item.title,
				price: calculatedPrice,
				weight,
				fillings:
					selectedFillings.length > 0 ? selectedFillings : undefined,
				optional:
					selectedOptionals.length > 0 ? selectedOptionals : undefined
			};
		}
	);

	const originalPrice = calculateTotalPrice(order);

	const isDiscounted =
		order.finalSum !== undefined &&
		isDiscountValid(originalPrice, order.finalSum);

	const totalPrice = isDiscounted ? order.finalSum : originalPrice;

	return {
		customerName: order.userData.name,
		customerPhone: order.userData.phone,
		customerEmail: undefined,
		deliveryMethod: order.userData.address === '' ? 'pickup' : 'delivery',
		deliveryAddress:
			order.userData.address === '' ? undefined : order.userData.address,
		deliveryDate: new Date().toISOString().split('T')[0],
		deliveryTime: (() => {
			const now = new Date();
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			return `${hours}:${minutes}`;
		})(),
		comment: order.userData.comment || undefined,
		totalPrice,
		originalPrice: isDiscounted ? originalPrice : undefined,
		items
	};
}
