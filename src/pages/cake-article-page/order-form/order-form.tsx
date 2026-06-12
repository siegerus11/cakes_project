/* eslint-disable import/no-unresolved */
import { useState, useEffect, SubmitEvent, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv } from 'uuid';

import ButtonController from '../../../components/button-controller/button-controller';
import ShoppingCartItem from '../../../components/shopping-cart-item/shopping-cart-item';
import SubmitButton from '../../../components/ui/button/submit-button';
import { AppRoute } from '../../../constants';
import useCheckboxes from '../../../hooks/useCheckBox';
import useRadio from '../../../hooks/useRadio';
import { useAppSelector, useActionCreators } from '../../../hooks/useStore';
import { cartProcessActions } from '../../../store/cart-process/cart-process';
import {
	selectTotalPrice,
	mainProcessActions
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
	const { setTotalPrice } = useActionCreators(mainProcessActions);
	const { addCartItem } = useActionCreators(cartProcessActions);
	const navigate = useNavigate();
	const location = useLocation();

	const [descriptionVisible, setDescriptionVisible] =
		useState<boolean>(false);

	const initialOptionCheckboxes = useMemo(
		() => createCheckBoxInitial<Optional>(cake.optionally, 'name'),
		[cake.optionally]
	);
	const initialFillingCheckboxes = useMemo(
		() => createCheckBoxInitial<Filling>(cake.filling, 'name'),
		[cake.filling]
	);
	const initialRadios = useMemo(
		() => createRadioInitial(cake.weight),
		[cake.weight]
	);

	const [optionCheckboxes, handleOptionalCheckboxChange] =
		useCheckboxes<CheckBoxValue>(initialOptionCheckboxes);

	const [fillingCheckboxes, handleFillingCheckboxChange] =
		useCheckboxes<CheckBoxValue>(initialFillingCheckboxes);

	const [radios, handleRadioChange] = useRadio(initialRadios);

	const optionalCheckboxPrices = useMemo(
		() =>
			getPricesByCheckboxValue<Optional>(
				cake.optionally,
				optionCheckboxes
			),
		[cake.optionally, optionCheckboxes]
	);
	const fillingCheckboxPrices = useMemo(
		() =>
			getPricesByCheckboxValue<Filling>(cake.filling, fillingCheckboxes),
		[cake.filling, fillingCheckboxes]
	);
	const weightRadioPrices = useMemo(
		() => getPricesByRadioValue(radios, cake.price),
		[radios, cake.price]
	);

	useEffect(() => {
		const groupPrices = [
			...optionalCheckboxPrices,
			...fillingCheckboxPrices,
			...weightRadioPrices
		];
		setTotalPrice(getPricesSum(groupPrices, initialprice));
	}, [
		fillingCheckboxPrices,
		weightRadioPrices,
		optionalCheckboxPrices,
		initialprice,
		setTotalPrice
	]);

	const handleMobileArrowClick = useCallback(() => {
		setDescriptionVisible(prevState => !prevState);
	}, []);

	const cakeOrder = useMemo(
		(): CakeOrder => ({
			cakeId: uuidv(),
			title: cake.title,
			image: cake.images[0],
			weight: radios,
			filling: fillingCheckboxes,
			optional: optionCheckboxes,
			quantity: 1,
			price: totalPrice
		}),
		[radios, fillingCheckboxes, optionCheckboxes, totalPrice]
	);

	const handleSubmit = useCallback(
		(e: SubmitEvent) => {
			e.preventDefault();
			addCartItem(cakeOrder);

			localStorage.setItem(
				`cake-cart-${cakeOrder.cakeId}`,
				JSON.stringify(cakeOrder)
			);

			navigate(AppRoute.ShoppingCart, {
				state: { from: location.pathname }
			});
		},
		[cakeOrder, navigate, location.pathname, addCartItem]
	);

	const describeClassName = descriptionVisible
		? `${styles.describe} ${styles.describe_visible}`
		: styles.describe;

	const arrowClassName = descriptionVisible
		? `${styles.describe__arrow} ${styles.describe__arrow_active}`
		: styles.describe__arrow;

	return (
		<>
			<div className={styles.component}>
				<form
					className={styles.feed}
					onSubmit={handleSubmit}
					id="order-form"
				>
					<Adder
						priceCounter={totalPrice}
						formId="order-form"
						isWrapped={false}
					/>
					<ol className={styles.list}>
						<FillingPart
							cake={cake}
							onCheckBoxChange={handleFillingCheckboxChange}
							checkBoxValues={fillingCheckboxes}
							onDescribeClick={onDescribeClick}
						/>
						<WeightPart
							onRadioChange={handleRadioChange}
							radios={radios}
						/>
						<OptionalPart
							cake={cake}
							onCheckBoxChange={handleOptionalCheckboxChange}
							checkBoxValues={optionCheckboxes}
						/>
					</ol>
					<div className={describeClassName}>
						{descriptionVisible || (
							<div className={styles.describe__blur}></div>
						)}
						<button
							className={arrowClassName}
							type="button"
							onClick={handleMobileArrowClick}
							aria-label={
								descriptionVisible
									? 'Скрыть описание'
									: 'Показать описание'
							}
						></button>
						<p>{cake.describe}</p>
					</div>
					<Adder
						priceCounter={totalPrice}
						formId="order-form"
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
						formId="order-form"
						label="В корзину"
					>
						<span>В корзину</span>
					</SubmitButton>
					<ShoppingCartItem className={styles.controller__cart} />
				</div>
			</ButtonController>
		</>
	);
};

export default OrderForm;
