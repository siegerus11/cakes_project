import { useMemo } from 'react';

import { SubmitButton } from '../../../../components/ui/button/button';
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

	const className = useMemo(
		() =>
			isWrapped
				? `${styles.component} ${styles.component_wrapped}`
				: styles.component,
		[isWrapped]
	);

	const adderClassName = useMemo(
		() => `${styles.adder} ${isWrapped ? styles.adder_w100 : ''}`,
		[isWrapped]
	);

	return (
		<div className={className}>
			<div className={adderClassName}>
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
