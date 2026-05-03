import { MouseEvent } from 'react';

import { SubmitButton } from '../../../../components/ui/button/button';
import styles from './adder.module.scss';

type AdderProps = {
	priceCounter: number;
	isWrapped: boolean;
	onSubmit: (e: MouseEvent, order: unknown) => void;
};

const Adder = ({ priceCounter, isWrapped, onSubmit }: AdderProps) => {
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
				<SubmitButton
					className={`button button_primary ${styles.adder__button}`}
					onClick={e => onSubmit(e, 'order')}
				>
					<span>Добавить в корзину</span>
				</SubmitButton>
			</div>
		</div>
	);
};

export default Adder;
