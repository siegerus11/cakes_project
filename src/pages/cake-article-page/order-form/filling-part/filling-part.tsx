import { ChangeEvent, useState } from 'react';
import { CakeOffer, CheckBoxValue, Filling } from '../../../../types/types';
import styles from './filling-part.module.scss';

type FillingItemProps = {
	fill: Filling;
	checkBoxValues: CheckBoxValue;
	onCheckBoxChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FillingItem = ({
	fill,
	checkBoxValues,
	onCheckBoxChange
}: FillingItemProps) => {
	const [popupVisible, setPopupVisible] = useState();
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCheckBoxChange(e);
	};
	return (
		<>
			<input
				type="checkbox"
				className={styles.checkbox}
				hidden={true}
				name={fill.name}
				id={fill.name}
				checked={checkBoxValues[fill.name]}
				onChange={handleCheckboxChange}
			/>
			<label className={styles.card} htmlFor={fill.name}>
				<div className={styles.card__top}>
					<img
						className={styles.card__image}
						src={fill.image}
						alt={fill.title}
						width="110"
						height="110"
					/>
				</div>

				<div className={styles.card__bottom}>
					<span className={styles.card__title}>{fill.title}</span>
					<button className={styles.card__button} type="button">
						описание
					</button>
				</div>
			</label>
		</>
	);
};

type FillingPartProps = {
	cake: CakeOffer;
	checkBoxValues: CheckBoxValue;
	onCheckBoxChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FillingPart = ({
	cake,
	checkBoxValues,
	onCheckBoxChange
}: FillingPartProps) => {
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCheckBoxChange(e);
	};
	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Начинка</h3>
			<div className={styles.wrapper}>
				{cake.filling.map(fill => {
					return (
						<FillingItem
							fill={fill}
							key={fill.name}
							checkBoxValues={checkBoxValues}
							onCheckBoxChange={handleCheckboxChange}
						/>
					);
				})}
			</div>
		</li>
	);
};

export default FillingPart;
