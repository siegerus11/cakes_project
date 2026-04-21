import { useState, ChangeEvent, useEffect } from 'react';

import {
	CakeOffer,
	CheckBoxValue,
	Filling,
	Optional,
	Radio
} from '../../../types/types';
import { createCheckBoxInitial } from '../../../utils/createCheckboxInitial';
import { createRadioInitial } from '../../../utils/createRadioInitial';
import { getPricesByCheckboxValue } from '../../../utils/getPriceByCheckboxValue';
import { getPricesByRadioValue } from '../../../utils/getPricesByRadioValue';
import { getPricesSum } from '../../../utils/getPricesSum';
import Adder from './adder/adder';
import FillingPart from './filling-part/filling-part';
import OptionalPart from './optional-part/optional-part';
import styles from './order-form.module.scss';
import WeightPart from './weight-part/weight-part';

type OrderFormProps = {
	cake: CakeOffer;
	initialprice: number;
	onDescribeClick: (idx: number) => void;
};

const OrderForm = ({ cake, initialprice, onDescribeClick }: OrderFormProps) => {
	const [priceCounter, setPriceCounter] = useState<number>(initialprice);

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
	const weightRadioPrices = getPricesByRadioValue(radios, cake.price);

	useEffect(() => {
		const groupPrices = [
			...optionalCheckboxPrices,
			...fillingCheckboxPrices,
			...weightRadioPrices
		];
		setPriceCounter(getPricesSum(groupPrices, initialprice));
	}, [optionalCheckboxValues, fillingCheckBoxValues,fillingCheckboxPrices,weightRadioPrices,optionalCheckboxPrices, initialprice , radios]);

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
				<Adder priceCounter={priceCounter} isWrapped={false} />
				<ol className={styles.list}>
					<FillingPart
						cake={cake}
						onCheckBoxChange={handleFillingCheckboxChange}
						checkBoxValues={fillingCheckBoxValues}
						onDescribeClick={onDescribeClick}
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
				<div className={styles.describe}>
					<button className={styles.describe__arrow} type="button"></button>
					<p>{cake.describe}</p>
				</div>
				<Adder priceCounter={priceCounter} isWrapped />
			</form>
		</div>
	);
};

export default OrderForm;

// import { useState, useEffect, useCallback, ChangeEvent } from 'react';
// import {
// 	CakeOffer,
// 	CheckBoxValue,
// 	Filling,
// 	Optional,
// 	Radio
// } from '../../../types/types';
// import { createRadioInitial } from '../../../utils/createRadioInitial';
// import { createCheckBoxInitial } from '../../../utils/createCheckboxInitial';
// import { getPricesByCheckboxValue } from '../../../utils/getPriceByCheckboxValue';
// import { getPricesByRadioValue } from '../../../utils/getPricesByRadioValue';
// import { getPricesSum } from '../../../utils/getPricesSum';

// import FillingPart from './filling-part/filling-part';
// import WeightPart from './weight-part/weight-part';
// import OptionalPart from './optional-part/optional-part';
// import styles from './order-form.module.scss';

// interface OrderFormProps {
// 	cake: CakeOffer;
// 	initialprice: number;
// 	onSetPriceCounter: (value: number) => void;
// }

// // 🤖 Кастомные хуки для разделения логики
// const useCheckboxes = <T extends Filling | Optional>(
// 	items: T[],
// 	fieldName: keyof T
// ) => {
// 	const initialState = createCheckBoxInitial(items, fieldName);
// 	const [values, setValues] = useState<CheckBoxValue>(initialState);

// 	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
// 		setValues(prev => ({
// 			...prev,
// 			[e.target.id]: e.target.checked
// 		}));
// 	}, []);

// 	const prices = getPricesByCheckboxValue(items, values);

// 	return { values, onChange: handleChange, prices };
// };

// const useRadios = (weights: number[]) => {
// 	const [radios, setRadios] = useState<Radio[]>(createRadioInitial(weights));

// 	const handleChange = useCallback(
// 		(e: ChangeEvent<HTMLInputElement>, idx: number) => {
// 			setRadios(prev =>
// 				prev.map((radio, i) =>
// 					i === idx
// 						? {
// 								...radio,
// 								isChecked: true,
// 								value: parseFloat(e.target.value)
// 						  }
// 						: {
// 								...radio,
// 								isChecked: false,
// 								value: radio.weightValue
// 						  }
// 				)
// 			);
// 		},
// 		[]
// 	);

// 	const prices = getPricesByRadioValue(radios, 0); // initialPrice передаем извне

// 	return { radios, onChange: handleChange, prices };
// };

// const OrderForm = ({
// 	cake,
// 	initialprice,
// 	onSetPriceCounter
// }: OrderFormProps) => {
// 	// 🎯 Используем кастомные хуки
// 	const filling = useCheckboxes(cake.filling, 'name');
// 	const optional = useCheckboxes(cake.optionally, 'name');
// 	const weight = useRadios(cake.weight);

// 	// 📊 Автоматический пересчет цены
// 	useEffect(() => {
// 		const totalPrice = getPricesSum(
// 			[...filling.prices, ...optional.prices, ...weight.prices],
// 			initialprice
// 		);
// 		onSetPriceCounter(totalPrice);
// 	}, [
// 		filling.prices,
// 		optional.prices,
// 		weight.prices,
// 		initialprice,
// 		onSetPriceCounter
// 	]);

// 	return (
// 		<div className={styles.component}>
// 			<form className={styles.feed}>
// 				<ol className={styles.list}>
// 					<FillingPart
// 						cake={cake}
// 						onCheckBoxChange={filling.onChange}
// 						checkBoxValues={filling.values}
// 					/>
// 					<WeightPart
// 						onRadioChange={weight.onChange}
// 						radios={weight.radios}
// 					/>
// 					<OptionalPart
// 						cake={cake}
// 						onCheckBoxChange={optional.onChange}
// 						checkBoxValues={optional.values}
// 					/>
// 				</ol>
// 			</form>
// 		</div>
// 	);
// };

// export default OrderForm;
