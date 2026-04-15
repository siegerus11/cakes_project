import { useState, ChangeEvent, useEffect } from 'react';

import FillingPart from './filling-part/filling-part';
import WeightPart from './weight-part/weight-part';
import OptionalPart from './optional-part/optional-part';
import styles from './order-form.module.scss';
import {
	CakeOffer,
	Radio,
	CheckBoxValue,
	Optional
} from '../../../types/types';
import { createRadioInitial } from '../../../utils/createRadioInitial';

type OrderFormProps = {
	cake: CakeOffer;
	onSetPriceCounter: (value: number) => void;
};

const OrderForm = ({ cake, onSetPriceCounter }: OrderFormProps) => {
	const initialRadios: Radio[] = createRadioInitial(cake.weight);
	const [radios, setRadios] = useState<Radio[]>(initialRadios);

	const [optionalCheckBoxValues, setOptionalCheckBoxValues] = useState({
		classicCandles: false,
		numberCandles: false,
		birthdayTopper: false,
		other: false
	});

	const getPriceByValue = (
		array: Optional[],
		objectValue: CheckBoxValue
	): number[] => {
		const filteredChecked = Object.entries(objectValue)
			.filter(item => item[1] === true)
			.map(item => item[0]);

		const relativePrices = array.map(objItem => {
			const res: number[] = [];
			filteredChecked.forEach(item => {
				if (objItem.name === item) res.push(objItem.price);
			});
			return res;
		});

		console.log(relativePrices.flat(1));
		return relativePrices.flat(1);
	};

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOptionalCheckBoxValues({
			...optionalCheckBoxValues,
			[e.target.id]: e.target.checked
		});
		getPriceByValue(cake.optionally, optionalCheckBoxValues);
	};

	// useEffect(() => {
	// 	onSetPriceCounter(
	// 		getPriceByValue(cake.optionally, optionalCheckBoxValues)!
	// 	);
	// }, [optionalCheckBoxValues]);

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
						onCheckBoxChange={handleCheckboxChange}
						checkBoxValues={optionalCheckBoxValues}
					/>
				</ol>
			</form>
		</div>
	);
};

export default OrderForm;
