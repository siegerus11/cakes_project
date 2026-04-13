import { CakeOffer, Filling } from '../../../../types/types';
import styles from './filling-part.module.scss';

type FillingItem = {};

type FillingItemProps = {
	fill: Filling;
};

const FillingItem = ({ fill }: FillingItemProps) => {
	return (
		<>
			<input
				type="checkbox"
				className={styles.checkbox}
				hidden={true}
				name={fill.name}
				id={fill.name}
			/>
			<label className={styles.card} htmlFor={fill.name}>
				<div className={styles.card__top}>
					<img
						className={styles.card__image}
						src="/"
						alt="filling"
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
};

const FillingPart = ({ cake }: FillingPartProps) => {
	return (
		<li className={styles.component}>
			<h3 className={styles.title}>Начинка</h3>
			<div className={styles.wrapper}>
				{cake.filling.map(fill => {
					return <FillingItem fill={fill} key={fill.name} />;
				})}
			</div>
		</li>
	);
};

export default FillingPart;
