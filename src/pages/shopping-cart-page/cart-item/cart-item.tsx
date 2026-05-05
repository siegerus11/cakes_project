import { useAppSelector } from '../../../hooks/useStore';
import { selectShoppingCart } from '../../../store/main-process/main-process';
import { CakeOrder, CheckBoxValue } from '../../../types/types';
import styles from './cart-item.module.scss';

type CartItemProps = {
	order: CakeOrder;
};

const CartItem = ({ order }: CartItemProps) => {
	const { price, filling, optional, weight } = order;

	const getChosen = (obj: CheckBoxValue) => {
		return Object.entries(obj)
			.filter(([_, value]) => value)
			.map(item => item[0]);
	};

	const fillingsSelected = getChosen(filling);
	const optionalSelected = getChosen(optional);

	const weightSelected = weight
		.filter(item => {
			return item.isChecked;
		})
		.map(item => item.weightValue);

	return (
		<div className={styles.item}>
			<div className={styles.item__main}>
				<div className={styles.item__image}>
					<img alt="vImage" />
				</div>
				<div>
					<h3 className={styles.item__title}>
						Торт с ягодами и безе
					</h3>

					<div className={styles.item__description}>
						<span>Начинка: Вишня с йогуртом</span>
						<span>Вес: 1,5 кг (10 порций)</span>
						<span>
							Дополнительно: Топпер «С Днем рождения», свечи
							классические
						</span>
					</div>
				</div>
			</div>
			<div className={`${styles.side} ${styles.item__side}`}>
				<div className={styles.side__wrapper}>
					<div className={styles.item__price}>{price} ₽</div>
					<div className={styles.quantity}>
						<button
							className={styles.quantity__button}
							type="button"
						></button>
						<span className={styles.quantity__value}>1</span>
						<button
							className={styles.quantity__button}
							type="button"
						></button>
					</div>
				</div>
			</div>
		</div>
	);
};

const CartList = () => {
	const cartSelector = useAppSelector(selectShoppingCart);
	// console.log(cartSelector);
	return (
		<ul className={styles.list}>
			{cartSelector.map(order => (
				<CartItem key={order.cakeId} order={order} />
			))}
		</ul>
	);
};

export default CartList;
