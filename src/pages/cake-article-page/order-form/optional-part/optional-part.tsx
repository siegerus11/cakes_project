import { CakeOffer, Optional } from '../../../../types/types';
import styles from './optional-part.module.scss';

type OptionalPartItemProps = {
	option: Optional;
};

const OptionalPartItem = ({ option }: OptionalPartItemProps) => {
	const { title, price, isInclude } = option;
	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<div className={styles.image}>
					<img src="" alt="" />
				</div>
				<div className={styles.side}>
					<span className={styles.headline}>{title}</span>
					<span className={styles.price}>{price}</span>
				</div>
			</div>
			<button type="button"></button>
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
