import { DISCOUNT_PERCENT } from '../config';

export const PROMO_CODE = '123456';

export function calculateDiscountedPrice(originalPrice: number): number {
	return Math.round(originalPrice * (1 - DISCOUNT_PERCENT / 100));
}

export function isDiscountValid(
	originalPrice: number,
	clientPrice: number
): boolean {
	if (originalPrice <= 0) return false;

	const expectedDiscounted = calculateDiscountedPrice(originalPrice);

	return clientPrice === expectedDiscounted;
}
