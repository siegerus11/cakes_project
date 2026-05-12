/* eslint-disable import/no-unresolved */
import { useState, useEffect, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv } from 'uuid';

import ButtonController from '../../../components/button-controller/button-controller';
import { SubmitButton } from '../../../components/ui/button/button';
import { AppRoute } from '../../../constants';
import useCheckboxes from '../../../hooks/useCheckBox';
import useRadio from '../../../hooks/useRadio';
import { useAppSelector, useAppDispatch } from '../../../hooks/useStore';
import {
	selectTotalPrice,
	setShoppingCart,
	setTotalPrice
} from '../../../store/main-process/main-process';
import {
	CakeOffer,
	CheckBoxValue,
	Filling,
	Optional,
	CakeOrder
} from '../../../types/types';
import createCheckBoxInitial from '../../../utils/createCheckboxInitial';
import createRadioInitial from '../../../utils/createRadioInitial';
import getPricesByCheckboxValue from '../../../utils/getPriceByCheckboxValue';
import { getPricesByRadioValue } from '../../../utils/getPricesByRadioValue';
import getPricesSum from '../../../utils/getPricesSum';
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
	const totalPrice = useAppSelector(selectTotalPrice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const [descriptionVisible, setDescriptionVisible] =
		useState<boolean>(false);

	const initialOptionCheckboxes = createCheckBoxInitial<Optional>(
		cake.optionally,
		'name'
	);

	const initialFillingCheckboxes = createCheckBoxInitial<Filling>(
		cake.filling,
		'name'
	);

	const initialRadios = createRadioInitial(cake.weight);

	const [optionCheckboxes, handleOptionalCheckboxChange] =
		useCheckboxes<CheckBoxValue>(initialOptionCheckboxes);

	const [fillingCheckboxes, handleFillingCheckboxChange] =
		useCheckboxes<CheckBoxValue>(initialFillingCheckboxes);

	const [radios, handleRadioChange] = useRadio(initialRadios);

	const optionalCheckboxPrices = getPricesByCheckboxValue<Optional>(
		cake.optionally,
		optionCheckboxes
	);
	const fillingCheckboxPrices = getPricesByCheckboxValue<Filling>(
		cake.filling,
		fillingCheckboxes
	);
	const weightRadioPrices = getPricesByRadioValue(radios, cake.price);

	useEffect(() => {
		const groupPrices = [
			...optionalCheckboxPrices,
			...fillingCheckboxPrices,
			...weightRadioPrices
		];
		dispatch(setTotalPrice(getPricesSum(groupPrices, initialprice)));
	}, [
		fillingCheckboxPrices,
		weightRadioPrices,
		optionalCheckboxPrices,
		initialprice,
		dispatch
	]);

	const handleMobileArrowClick = () => {
		setDescriptionVisible(prevState => !prevState);
	};

	const cakeOrder: CakeOrder = {
		cakeId: uuidv(),
		weight: radios,
		filling: fillingCheckboxes,
		optional: optionCheckboxes,
		quantity: 1,
		price: totalPrice
	};

	const handleSubmit = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(setShoppingCart(cakeOrder));
		navigate(AppRoute.ShoppingCart, {
			state: { from: location.pathname }
		});
	};

	return (
		<>
			<div className={styles.component}>
				<form className={styles.feed}>
					<Adder
						priceCounter={totalPrice}
						onSubmit={handleSubmit}
						isWrapped={false}
					/>
					<ol className={styles.list}>
						<FillingPart
							cake={cake}
							onCheckBoxChange={e =>
								handleFillingCheckboxChange(e)
							}
							checkBoxValues={fillingCheckboxes}
							onDescribeClick={onDescribeClick}
						/>
						<WeightPart
							onRadioChange={handleRadioChange}
							radios={radios}
						/>
						<OptionalPart
							cake={cake}
							onCheckBoxChange={e =>
								handleOptionalCheckboxChange(e)
							}
							checkBoxValues={optionCheckboxes}
						/>
					</ol>
					<div
						className={
							descriptionVisible
								? `${styles.describe} ${styles.describe_visible}`
								: styles.describe
						}
					>
						{descriptionVisible || (
							<div className={styles.describe__blur}></div>
						)}
						<button
							className={
								descriptionVisible
									? `${styles.describe__arrow} ${styles.describe__arrow_active}`
									: styles.describe__arrow
							}
							type="button"
							onClick={handleMobileArrowClick}
						></button>
						{cake.describe}
					</div>
					<Adder
						priceCounter={totalPrice}
						onSubmit={handleSubmit}
						isWrapped
					/>
				</form>
			</div>
			<ButtonController outerClass={styles.controller}>
				<div className={styles.controller__wrapper}>
					<span className={styles.controller__price}>
						{totalPrice} ₽
					</span>
					<SubmitButton
						className={`button button_primary ${styles.controller__button}`}
						onClick={handleSubmit}
					>
						<span>В корзину</span>
					</SubmitButton>
				</div>
			</ButtonController>
		</>
	);
};

export default OrderForm;
