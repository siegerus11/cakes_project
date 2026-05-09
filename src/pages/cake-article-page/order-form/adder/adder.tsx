import { MouseEvent } from 'react';

import { SubmitButton } from '../../../../components/ui/button/button';
import getFormattedPrice from '../../../../utils/getFormattedPrice';
import styles from './adder.module.scss';

type AdderProps = {
	priceCounter: number;
	isWrapped: boolean;
	onSubmit: (e: MouseEvent) => void;
};

const Adder = ({ priceCounter, isWrapped, onSubmit }: AdderProps) => {
	const formattedpriceCounter = getFormattedPrice(priceCounter);

	const className = isWrapped
		? `${styles.component} ${styles.component_wrapped}`
		: styles.component;
	return (
		<div className={className}>
			<div className={styles.adder}>
				<span className={styles.adder__price}>
					{`${formattedpriceCounter} ₽`}
				</span>
				<SubmitButton
					className={`button button_primary ${styles.adder__button}`}
					onClick={onSubmit}
				>
					<span>Добавить в корзину</span>
				</SubmitButton>
			</div>
		</div>
	);
};

export default Adder;
