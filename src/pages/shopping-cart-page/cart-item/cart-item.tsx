import { useMemo, useCallback, memo } from 'react';

import { ConfirmMessage } from '../../../constants';
import useConfirm from '../../../hooks/useConfirm';
import { useActionCreators, useAppSelector } from '../../../hooks/useStore';
import {
	cartProcessActions,
	selectShoppingCart
} from '../../../store/cart-process/cart-process';
import { CakeOrder } from '../../../types/types';
import getChosen from '../../../utils/getChosen';
import getFormattedPrice from '../../../utils/getFormattedPrice';
import getPersonQuantity from '../../../utils/getPersonQuantity';
import updateQuantity from '../../../utils/updateQuantity';
import styles from './cart-item.module.scss';

type CartItemProps = {
	order: CakeOrder;
};

const CartItem = memo(({ order }: CartItemProps) => {
	const { price, filling, optional, weight, id, quantity, image, title } =
		order;
	const { setCartItemQuantity, removeCartItem } =
		useActionCreators(cartProcessActions);
	const confirm = useConfirm();

	const fillingsSelected = useMemo(() => getChosen(filling), [filling]);
	const optionalSelected = useMemo(() => getChosen(optional), [optional]);
	const weightSelected = useMemo(() => getChosen(weight), [weight]);

	const priceValue = useMemo(
		() => getFormattedPrice(price * quantity),
		[price, quantity]
	);

	const handleIncrClick = useCallback(
		(idx: string, num: number, increase: boolean) => {
			if (quantity <= 1 && !increase) {
				const answer = confirm(ConfirmMessage.ClearOrder);
				if (answer) {
					removeCartItem(idx);
					localStorage.removeItem(`cake-cart-${idx}`);
				}
				return;
			}
			setCartItemQuantity({ id, num });
			updateQuantity(quantity, num, id);
		},
		[confirm, setCartItemQuantity, removeCartItem, quantity]
	);

	const handleDecrease = useCallback(
		() => handleIncrClick(id, -1, false),
		[handleIncrClick, id]
	);
	const handleIncrease = useCallback(
		() => handleIncrClick(id, 1, true),
		[handleIncrClick, id]
	);

	const fillingsText = useMemo(
		() =>
			fillingsSelected.length
				? fillingsSelected.map((fill, i, arr) =>
						arr.length < 1 || i === arr.length - 1
							? `${fill} `
							: `${fill}, `
				  )
				: 'Заварной крем',
		[fillingsSelected]
	);

	const optionalText = useMemo(
		() =>
			optionalSelected.length
				? optionalSelected.map((option, i, arr) =>
						arr.length < 1 || i === arr.length - 1
							? `${option} `
							: `${option}, `
				  )
				: 'Не выбрано',
		[optionalSelected]
	);

	const weightText = useMemo(
		() =>
			`${weightSelected} кг (${getPersonQuantity(
				Number(weightSelected[0]),
				true
			)} порций)`,
		[weightSelected]
	);

	return (
		<li className={styles.item}>
			<div className={styles.item__main}>
				<div className={styles.item__image}>
					<img src={image} alt="Торт" width="60" height="60" />
				</div>
				<div>
					<h3 className={styles.item__title}>{title}</h3>
					<div className={styles.item__description}>
						<span>Начинка: {fillingsText}</span>
						<span>Вес: {weightText}</span>
						<span>Дополнительно: {optionalText}</span>
					</div>
				</div>
			</div>
			<div className={`${styles.side} ${styles.item__side}`}>
				<div className={styles.side__wrapper}>
					<div className={styles.item__price}>{priceValue} ₽</div>
					<div className={styles.quantity}>
						<button
							className={`cart-press ${styles.quantity__button}`}
							type="button"
							onClick={handleDecrease}
							aria-label="Уменьшить количество"
						></button>
						<span className={styles.quantity__value}>
							{quantity}
						</span>
						<button
							className={`cart-press ${styles.quantity__button}`}
							type="button"
							onClick={handleIncrease}
							aria-label="Увеличить количество"
						></button>
					</div>
				</div>
			</div>
		</li>
	);
});

CartItem.displayName = 'CartItem';

const CartList = () => {
	const cartSelector = useAppSelector(selectShoppingCart);

	return (
		<ul className={styles.list}>
			{cartSelector.map(order => (
				<CartItem key={order.id} order={order} />
			))}
		</ul>
	);
};

export default CartList;
