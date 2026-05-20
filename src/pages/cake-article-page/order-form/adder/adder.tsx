import { useMemo } from 'react';

import SubmitButton from '../../../../components/ui/button/submit-button';
import getFormattedPrice from '../../../../utils/getFormattedPrice';
import styles from './adder.module.scss';

type AdderProps = {
	priceCounter: number;
	isWrapped: boolean;
	formId: string;
};

const Adder = ({ priceCounter, isWrapped, formId }: AdderProps) => {
	const formattedpriceCounter = useMemo(
		() => getFormattedPrice(priceCounter),
		[priceCounter]
	);

	const className = isWrapped
		? `${styles.component} ${styles.component_wrapped}`
		: styles.component;

	const adderClassName = `${styles.adder} ${
		isWrapped ? styles.adder_w100 : ''
	}`;

	return (
		<div className={className}>
			<div className={adderClassName}>
				<span className={styles.adder__price}>
					{`${formattedpriceCounter} ₽`}
				</span>
				<SubmitButton
					className={`button button_primary ${styles.adder__button}`}
					formId={formId}
					label="Добавить в корзину"
				>
					<span>Добавить в корзину</span>
				</SubmitButton>
			</div>
		</div>
	);
};

export default Adder;
