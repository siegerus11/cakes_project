import { useMemo, useCallback, memo } from 'react';

import { ConfirmMessage } from '../../../constants';
import useConfirm from '../../../hooks/useConfirm';
import { useAppSelector, useAppDispatch } from '../../../hooks/useStore';
import {
	setCartQuantity,
	selectShoppingCart,
	removeCartItem
} from '../../../store/main-process/main-process';
import { CakeOrder } from '../../../types/types';
import getChosen from '../../../utils/getChosen';
import getFormattedPrice from '../../../utils/getFormattedPrice';
import getPersonQuantity from '../../../utils/getPersonQuantity';
import styles from './cart-item.module.scss';

type CartItemProps = {
	order: CakeOrder;
};

const CartItem = memo(({ order }: CartItemProps) => {
	const { price, filling, optional, weight, cakeId, quantity } = order;
	const dispatch = useAppDispatch();
	const confirm = useConfirm();

	const fillingsSelected = useMemo(() => getChosen(filling), [filling]);
	const optionalSelected = useMemo(() => getChosen(optional), [optional]);
	const weightSelected = useMemo(() => getChosen(weight), [weight]);

	const priceValue = useMemo(
		() => getFormattedPrice(price * quantity),
		[price, quantity]
	);

	const handleIncrClick = useCallback(
		(id: string, num: number, increase: boolean) => {
			if (quantity <= 1 && !increase) {
				const answer = confirm(ConfirmMessage.ClearOrder);
				if (answer) dispatch(removeCartItem(id));
			}
			dispatch(setCartQuantity({ id, num }));
		},
		[confirm, dispatch, quantity]
	);

	const handleDecrease = useCallback(
		() => handleIncrClick(cakeId, -1, false),
		[handleIncrClick, cakeId]
	);
	const handleIncrease = useCallback(
		() => handleIncrClick(cakeId, 1, true),
		[handleIncrClick, cakeId]
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
		<div className={styles.item}>
			<div className={styles.item__main}>
				<div className={styles.item__image}>
					<img alt="cake" width="60" height="60" />
				</div>
				<div>
					<h3 className={styles.item__title}>
						Торт с ягодами и безе
					</h3>

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
							className={styles.quantity__button}
							type="button"
							onClick={handleDecrease}
						></button>
						<span className={styles.quantity__value}>
							{quantity}
						</span>
						<button
							className={styles.quantity__button}
							type="button"
							onClick={handleIncrease}
						></button>
					</div>
				</div>
			</div>
		</div>
	);
});

CartItem.displayName = 'CartItem';

const CartList = () => {
	const cartSelector = useAppSelector(selectShoppingCart);

	return (
		<ul className={styles.list}>
			{cartSelector.map(order => (
				<CartItem key={order.cakeId} order={order} />
			))}
		</ul>
	);
};

export default CartList;
