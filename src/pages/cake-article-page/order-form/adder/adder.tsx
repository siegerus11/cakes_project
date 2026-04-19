import styles from './adder.module.scss';
import Button from '../../../../components/ui/button/button';

type AdderProps = {
	priceCounter: number;
};

const Adder = ({ priceCounter }: AdderProps) => {
	const formattedpriceCounter = `${priceCounter.toString()[0]} ${priceCounter
		.toString()
		.slice(1)}`;
	return (
		<div className={styles.component}>
			<div className={styles.adder}>
				<span className={styles.adder__price}>
					{`${formattedpriceCounter} ₽`}
				</span>
				<Button
					className={`button button_primary ${styles.button}`}
					type={'submit'}
				>
					<span>Добавить в корзину</span>
				</Button>
			</div>
		</div>
	);
};

export default Adder;
