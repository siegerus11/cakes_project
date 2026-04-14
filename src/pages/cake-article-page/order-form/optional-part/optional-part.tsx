import { CakeOffer, Optional } from '../../../../types/types';
import styles from './optional-part.module.scss';

type OptionalPartItemProps = {
	option: Optional;
};

const OptionalPartItem = ({ option }: OptionalPartItemProps) => {
	const { title, name, price, isInclude, image } = option;
	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<div className={styles.image}>
					<img src={image} alt={'title'} width="60" height="60" />
				</div>
				<div className={styles.side}>
					<span className={styles.side__headline}>{title}</span>
					<span className={styles.side__price}>{`+${price} ₽`}</span>
				</div>
			</div>
			<div>
				<input type="checkbox" id={name} />
				<label className={styles.label} htmlFor={name}></label>
			</div>
		</div>
	);
};

type OptionalPartProps = {
	cake: CakeOffer;
};

const OptionalPart = ({ cake }: OptionalPartProps) => {
	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Дополнительно</h3>
			{cake.optionally.map((option, i) => {
				const keyValue = `${i}-${option.name}`;
				return <OptionalPartItem key={keyValue} option={option} />;
			})}
		</li>
	);
};

export default OptionalPart;
