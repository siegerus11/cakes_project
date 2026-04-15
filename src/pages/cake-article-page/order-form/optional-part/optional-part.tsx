import { ChangeEvent } from 'react';
import { CakeOffer, Optional, CheckBoxValue } from '../../../../types/types';
import styles from './optional-part.module.scss';

type OptionalPartItemProps = {
	option: Optional;
	checkBoxValues: CheckBoxValue;
	onCheckBoxChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OptionalPartItem = ({
	option,
	checkBoxValues,
	onCheckBoxChange
}: OptionalPartItemProps) => {
	const { title, name, price, isInclude, image } = option;

	const maxTitleLength = 30;
	const headlineClassName =
		title.length > maxTitleLength
			? `${styles.side__headline} ${styles.side__headline_fz14}`
			: styles.side__headline;

	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<div className={styles.image}>
					<img src={image} alt={title} width="60" height="60" />
				</div>
				<div className={styles.side}>
					<span className={headlineClassName}>{title}</span>
					<span className={styles.side__price}>{`+${price} ₽`}</span>
				</div>
			</div>
			<div>
				<input
					type="checkbox"
					id={name}
					value={name}
					checked={checkBoxValues[name]}
					onChange={e => onCheckBoxChange(e)}
				/>
				<label className={styles.label} htmlFor={name}></label>
			</div>
		</div>
	);
};

type OptionalPartProps = {
	cake: CakeOffer;
	checkBoxValues: CheckBoxValue;
	onCheckBoxChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const OptionalPart = ({
	cake,
	checkBoxValues,
	onCheckBoxChange
}: OptionalPartProps) => {
	const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
		onCheckBoxChange(e);
	};

	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Дополнительно</h3>
			{cake.optionally.map((option, i) => {
				const keyValue = `${i}-${option.name}`;
				return (
					<OptionalPartItem
						key={keyValue}
						option={option}
						checkBoxValues={checkBoxValues}
						onCheckBoxChange={handleCheckBoxChange}
					/>
				);
			})}
		</li>
	);
};

export default OptionalPart;
