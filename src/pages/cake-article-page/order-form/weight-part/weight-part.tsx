import {
	ChangeEvent,
	useEffect,
	useState,
	useId,
	useCallback,
	useMemo,
	useRef
} from 'react';

import { Radio } from '../../../../types/types';
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

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			handleRadioChange(e, index);
		},
		[handleRadioChange, index]
	);

	const labelText = useMemo(
		() =>
			`${weightValue}кг (на ${getPersonQuantity(
				weightValue,
				false
			)} гостей)`,
		[weightValue]
	);

	return (
		<div>
			<label className={styles.label} htmlFor={id}>
				{labelText}
			</label>
			<input
				type="radio"
				name="weight-value"
				id={id}
				value={weightValue}
				checked={isChecked}
				onChange={handleChange}
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
	const dropdownId = useId();
	const selectRef = useRef<HTMLDivElement>(null);

	const handleRadioChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, idx: number) => {
			onRadioChange(e, idx);
		},
		[onRadioChange]
	);

	const handleInteractorClick = useCallback(() => {
		setIsVisibleSelect(prevState => !prevState);
	}, []);

	useEffect(() => {
		const handleDocumentClick = (e: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(e.target as Node)
			) {
				setIsVisibleSelect(false);
			}
		};
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsVisibleSelect(false);
			}
		};

		if (isVisibleSelect) {
			document.addEventListener('click', handleDocumentClick);
			document.addEventListener('keydown', handleKeyDown);
		}
		return () => {
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isVisibleSelect]);

	const activeRadio = useMemo(
		() => radios.find(radio => radio.isChecked === true),
		[radios]
	);
	const activeWeight = activeRadio?.weightValue ?? 0;
	const interactorHtml = useMemo(
		() =>
			`${activeWeight} кг (на ${getPersonQuantity(
				activeWeight,
				false
			)} гостей)`,
		[activeWeight]
	);

	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Вес</h3>
			<div className={styles.select} ref={selectRef}>
				<button
					type="button"
					className={styles.select__interactor}
					onClick={handleInteractorClick}
					aria-expanded={isVisibleSelect}
					aria-controls={dropdownId}
					aria-label="Выберите вес торта"
				>
					<span>{interactorHtml}</span>
					<svg
						className={styles.icon}
						viewBox="0 0 20 20"
						width="20"
						height="20"
						aria-hidden="true"
					>
						<use xlinkHref="#arrow-sm"></use>
					</svg>
				</button>
				{isVisibleSelect && (
					<div
						className={styles.select__dropdown}
						id={dropdownId}
						role="radiogroup"
						aria-label="Варианты веса торта"
					>
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
