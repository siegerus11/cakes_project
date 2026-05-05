import styles from './cart-item.module.scss';

const CartItem = () => {
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
					<div className={styles.item__price}>4 600 ₽</div>
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
	return (
		<ul className={styles.list}>
			<CartItem />
		</ul>
	);
};

export default CartList;
