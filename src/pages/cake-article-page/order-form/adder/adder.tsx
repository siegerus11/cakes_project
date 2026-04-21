import Button from '../../../../components/ui/button/button';
import styles from './adder.module.scss';

type AdderProps = {
	priceCounter: number;
	isWrapped: boolean;
};

const Adder = ({ priceCounter, isWrapped }: AdderProps) => {
	const formattedpriceCounter = `${priceCounter.toString()[0]} ${priceCounter
		.toString()
		.slice(1)}`;

	const className = isWrapped
		? `${styles.component} ${styles.component_wrapped}`
		: styles.component;
	return (
		<div className={className}>
			<div className={styles.adder}>
				<span className={styles.adder__price}>
					{`${formattedpriceCounter} ₽`}
				</span>
				<Button
					className={`button button_primary ${styles.adder__button}`}
				>
					<span>Добавить в корзину</span>
				</Button>
			</div>
		</div>
	);
};

export default Adder;
