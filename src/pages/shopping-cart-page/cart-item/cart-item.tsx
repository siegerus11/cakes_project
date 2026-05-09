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

const CartItem = ({ order }: CartItemProps) => {
	const { price, filling, optional, weight, cakeId, quantity } = order;
	const dispatch = useAppDispatch();
	const confirm = useConfirm();

	const fillingsSelected = getChosen(filling);
	const optionalSelected = getChosen(optional);
	const weightSelected = getChosen(weight);

	const priceValue = getFormattedPrice(price * quantity);

	const hanleIncrClick = (id: string, num: number, increase: boolean) => {
		if (order.quantity <= 1 && !increase) {
			const answer = confirm(ConfirmMessage.ClearOrder);
			if (answer) dispatch(removeCartItem(id));
		}
		dispatch(setCartQuantity({ id, num }));
	};

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
						<span>
							Начинка:{' '}
							{fillingsSelected.length
								? fillingsSelected.map((fill, i, arr) =>
										arr.length < 1 || i === arr.length - 1
											? `${fill} `
											: `${fill}, `
								  )
								: 'Заварной крем'}
						</span>
						<span>
							Вес: {weightSelected} кг (
							{getPersonQuantity(Number(weightSelected[0]), true)}
							порций)
						</span>
						<span>
							Дополнительно:{' '}
							{optionalSelected.length
								? optionalSelected.map((option, i, arr) =>
										arr.length < 1 || i === arr.length - 1
											? `${option} `
											: `${option}, `
								  )
								: 'Не выбрано'}
						</span>
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
							onClick={() => hanleIncrClick(cakeId, -1, false)}
						></button>
						<span className={styles.quantity__value}>
							{quantity}
						</span>
						<button
							className={styles.quantity__button}
							type="button"
							onClick={() => hanleIncrClick(cakeId, 1, true)}
						></button>
					</div>
				</div>
			</div>
		</div>
	);
};

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
