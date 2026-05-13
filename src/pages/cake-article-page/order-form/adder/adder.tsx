import { MouseEvent } from 'react';

import { SubmitButton } from '../../../../components/ui/button/button';
import getFormattedPrice from '../../../../utils/getFormattedPrice';
import styles from './adder.module.scss';

type AdderProps = {
	priceCounter: number;
	isWrapped: boolean;
	formId: string;
};

const Adder = ({ priceCounter, isWrapped, formId }: AdderProps) => {
	const formattedpriceCounter = getFormattedPrice(priceCounter);

	const className = isWrapped
		? `${styles.component} ${styles.component_wrapped}`
		: styles.component;
	return (
		<div className={className}>
			<div
				className={`${styles.adder} ${
					isWrapped ? styles.adder_w100 : ''
				}`}
			>
				<span className={styles.adder__price}>
					{`${formattedpriceCounter} ₽`}
				</span>
				<SubmitButton
					className={`button button_primary ${styles.adder__button}`}
					formId={formId}
				>
					<span>Добавить в корзину</span>
				</SubmitButton>
			</div>
		</div>
	);
};

export default Adder;
