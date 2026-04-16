import { useState, ChangeEvent, useEffect } from 'react';

import FillingPart from './filling-part/filling-part';
import WeightPart from './weight-part/weight-part';
import OptionalPart from './optional-part/optional-part';
import styles from './order-form.module.scss';
import {
	CakeOffer,
	CheckBoxValue,
	Filling,
	Optional,
	Radio
} from '../../../types/types';
import { createRadioInitial } from '../../../utils/createRadioInitial';
import { getPricesByCheckboxValue } from '../../../utils/getPriceByCheckboxValue';
import { getPricesSum } from '../../../utils/getPricesSum';
import { createCheckBoxInitial } from '../../../utils/createCheckboxInitial';

type OrderFormProps = {
	cake: CakeOffer;
	onSetPriceCounter: (value: number) => void;
};

const OrderForm = ({ cake, onSetPriceCounter }: OrderFormProps) => {
	const initialRadios: Radio[] = createRadioInitial(cake.weight);
	const [radios, setRadios] = useState<Radio[]>(initialRadios);

	const initialOptionCheckboxes = createCheckBoxInitial<Optional>(
		cake.optionally,
		'name'
	);
	const [optionalCheckboxValues, setOptionalCheckboxValues] =
		useState<CheckBoxValue>(initialOptionCheckboxes);

	const initialFillingCheckboxes = createCheckBoxInitial<Filling>(
		cake.filling,
		'name'
	);
	const [fillingCheckBoxValues, setFillingCheckBoxValues] =
		useState<CheckBoxValue>(initialFillingCheckboxes);

	const handleOptionalCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOptionalCheckboxValues({
			...optionalCheckboxValues,
			[e.target.id]: e.target.checked
		});
	};

	const handleFillingCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFillingCheckBoxValues({
			...fillingCheckBoxValues,
			[e.target.id]: e.target.checked
		});
	};

	// will be refactoring to store
	const optionalCheckboxPrices = getPricesByCheckboxValue<Optional>(
		cake.optionally,
		optionalCheckboxValues
	);
	const fillingCheckboxPrices = getPricesByCheckboxValue<Filling>(
		cake.filling,
		fillingCheckBoxValues
	);

	useEffect(() => {
		onSetPriceCounter(getPricesSum(optionalCheckboxPrices, cake.price));
	}, [optionalCheckboxValues]);
	useEffect(() => {
		onSetPriceCounter(getPricesSum(fillingCheckboxPrices, cake.price));
	}, [fillingCheckBoxValues]);

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
					<FillingPart
						cake={cake}
						onCheckBoxChange={handleFillingCheckboxChange}
						checkBoxValues={fillingCheckBoxValues}
					/>
					<WeightPart
						onRadioChange={handleRadioChange}
						radios={radios}
					/>
					<OptionalPart
						cake={cake}
						onCheckBoxChange={handleOptionalCheckboxChange}
						checkBoxValues={optionalCheckboxValues}
					/>
				</ol>
			</form>
		</div>
	);
};

export default OrderForm;
