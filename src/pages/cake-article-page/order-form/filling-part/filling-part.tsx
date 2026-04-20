import { ChangeEvent, useState } from 'react';
import { CakeOffer, CheckBoxValue, Filling } from '../../../../types/types';
import styles from './filling-part.module.scss';

type FillingItemProps = {
	index: number;
	fill: Filling;
	checkBoxValues: CheckBoxValue;
	onCheckBoxChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onDescribeClick: (idx: number) => void;
};

const FillingItem = ({
	index,
	fill,
	checkBoxValues,
	onCheckBoxChange,
	onDescribeClick
}: FillingItemProps) => {
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCheckBoxChange(e);
	};

	const handleDescribeClick = (idx: number) => {
		onDescribeClick(idx);
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
					<button
						className={styles.card__button}
						type="button"
						onClick={() => handleDescribeClick(index)}
					>
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
	onDescribeClick: (idx: number) => void;
};

const FillingPart = ({
	cake,
	checkBoxValues,
	onCheckBoxChange,
	onDescribeClick
}: FillingPartProps) => {
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCheckBoxChange(e);
	};
	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Начинка</h3>
			<div className={styles.wrapper}>
				{cake.filling.map((fill, i) => {
					return (
						<FillingItem
							index={i}
							fill={fill}
							key={fill.name}
							checkBoxValues={checkBoxValues}
							onCheckBoxChange={handleCheckboxChange}
							onDescribeClick={onDescribeClick}
						/>
					);
				})}
			</div>
		</li>
	);
};

export default FillingPart;
