import { useState, ChangeEvent, useEffect } from 'react';

import FillingPart from './filling-part/filling-part';
import WeightPart from './weight-part/weight-part';
import OptionalPart from './optional-part/optional-part';
import styles from './order-form.module.scss';
import { CakeOffer, CheckBoxValue, Radio } from '../../../types/types';
import { createRadioInitial } from '../../../utils/createRadioInitial';
import { getPriceByCheckboxValue } from '../../../utils/getPriceByCheckboxValue';
import { getPricesSum } from '../../../utils/getPricesSum';

type OrderFormProps = {
	cake: CakeOffer;
	onSetPriceCounter: (value: number) => void;
};

const OrderForm = ({ cake, onSetPriceCounter }: OrderFormProps) => {
	const initialRadios: Radio[] = createRadioInitial(cake.weight);
	const [radios, setRadios] = useState<Radio[]>(initialRadios);
	const [optionalCheckBoxValues, setOptionalCheckBoxValues] =
		useState<CheckBoxValue>({
			classicCandles: false,
			numberCandles: false,
			birthdayTopper: false,
			other: false
		});

	const handleOptionalCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOptionalCheckBoxValues({
			...optionalCheckBoxValues,
			[e.target.id]: e.target.checked
		});
	};

	const optionalCheckboxPrices = getPriceByCheckboxValue(
		cake.optionally,
		optionalCheckBoxValues
	);
	useEffect(() => {
		onSetPriceCounter(getPricesSum(optionalCheckboxPrices, cake.price));
	}, [optionalCheckBoxValues]);

	const handleRadioChange = (
		e: ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		setRadios(
			radios.map((radio, i) => {
				return i === idx
					? {
							...radio,
							isChecked: true,
							value: parseFloat(e.target.value)
					  }
					: { ...radio, isChecked: false, value: radio.weightValue };
			})
		);
	};

	return (
		<div className={styles.component}>
			<form className={styles.feed}>
				<ol className={styles.list}>
					<FillingPart cake={cake} />
					<WeightPart
						onRadioChange={handleRadioChange}
						radios={radios}
					/>
					<OptionalPart
						cake={cake}
						onCheckBoxChange={handleOptionalCheckboxChange}
						checkBoxValues={optionalCheckBoxValues}
					/>
				</ol>
			</form>
		</div>
	);
};

export default OrderForm;
