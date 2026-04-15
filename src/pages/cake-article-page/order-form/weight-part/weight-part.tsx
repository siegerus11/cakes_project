import { ChangeEvent, /* MouseEvent, */ useEffect, useState } from 'react';

import { CakeOffer, Radio } from '../../../../types/types';
import { createRadioInitial } from '../../../../utils/createRadioInitial';
import { getPersonQuantity } from '../../../../utils/getPersonQuantity';
import styles from './weight-part.module.scss';

type WeightPartRadioProps = {
	weightValue: number;
	index: number;
	isChecked: boolean;
	handleRadioChange: (e: ChangeEvent<HTMLInputElement>, idx: number) => void;
};

const WeightPartRadio = ({
	weightValue,
	index,
	isChecked,
	handleRadioChange
}: WeightPartRadioProps) => {
	const id = index.toString();

	return (
		<div>
			<label className={styles.label} htmlFor={id}>
				{`${weightValue}кг (на ${getPersonQuantity(
					weightValue
				)} гостей)`}
			</label>
			<input
				type="radio"
				name="weight-value"
				id={id}
				value={weightValue}
				checked={isChecked}
				onChange={e => handleRadioChange(e, index)}
			/>
		</div>
	);
};

type WeightPartProps = {
	radios: Radio[];
	onRadioChange: (e: ChangeEvent<HTMLInputElement>, idx: number) => void;
};

const WeightPart = ({ onRadioChange, radios }: WeightPartProps) => {
	const [isVisibleSelect, setIsVisibleSelect] = useState(false);

	const handleRadioChange = (
		e: ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		onRadioChange(e, idx);
	};

	const handleInteractorClick = () => {
		setIsVisibleSelect(prevState => !prevState);
	};

	useEffect(() => {
		const handleDocumentClick = (e: MouseEvent) => {
			const target = e.target as HTMLDivElement;
			if (target.closest(`.${styles.select}`)) return;
			setIsVisibleSelect(false);
		};
		if (isVisibleSelect)
			document.addEventListener('click', handleDocumentClick);
		return () => document.removeEventListener('click', handleDocumentClick);
	}, [isVisibleSelect]);

	const activeRadio = radios.find(radio => radio.isChecked === true);
	const interactorHtml = `${
		activeRadio?.weightValue
	} кг (на ${getPersonQuantity(activeRadio?.weightValue!)} гостей)`;

	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Вес</h3>
			<div className={styles.select}>
				<div
					className={styles.select__interactor}
					onClick={handleInteractorClick}
				>
					<span>{interactorHtml}</span>
					<svg
						className={styles.icon}
						viewBox="0 0 20 20"
						width="20"
						height="20"
					>
						<use xlinkHref="#arrow-sm"></use>
					</svg>
				</div>
				{isVisibleSelect && (
					<div className={styles.select__dropdown}>
						{radios.map((radio, i) => {
							const keyValue = `${i}-${radio.weightValue}`;
							return (
								<WeightPartRadio
									weightValue={radio.weightValue}
									index={i}
									key={keyValue}
									handleRadioChange={handleRadioChange}
									isChecked={radio.isChecked}
								/>
							);
						})}
					</div>
				)}
			</div>
		</li>
	);
};

export default WeightPart;
