import { useAppSelector, useAppDispatch } from '../../../hooks/useStore';
import { setShoppingCart } from '../../../store/main-process/main-process';
import { selectShoppingCart } from '../../../store/main-process/main-process';
import { CakeOrder } from '../../../types/types';
import getChosen from '../../../utils/getChosen';
import getPersonQuantity from '../../../utils/getPersonQuantity';
import styles from './cart-item.module.scss';

type CartItemProps = {
	order: CakeOrder;
};

const testObj = {
	num: 10,
	get res() {
		return this.num * 2;
	}
};

console.log(testObj.res);

const CartItem = ({ order }: CartItemProps) => {
	const { price, filling, optional, weight, cakeId } = order;
	const dispatch = useAppDispatch();

	const fillingsSelected = getChosen(filling);
	const optionalSelected = getChosen(optional);
	const weightSelected = getChosen(weight);

	const hanleIncrClick = () => {
		console.log('incrClick');
		dispatch(setShoppingCart(order));
	};

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
							onClick={() => hanleIncrClick()}
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
