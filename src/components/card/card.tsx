import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { CakeOffer } from '../../types/types';
import styles from './card.module.scss';

type CardProps = {
	cake: CakeOffer;
};

const Card = ({ cake }: CardProps) => {
	const { title, images, price } = cake;

	return (
		<Link to={AppRoute.ROOT} className={styles.card}>
			<div className={styles.imgWrap}>
				<img src={images[0]} alt={title} width="282" height="282" />
			</div>
			<span className={styles.title}>{title}</span>
			<div className={styles.bottom}>
				<span className={styles.cost}>{/* {price}₽ */}3 600 ₽</span>
				<button className={styles.button}></button>
			</div>
		</Link>
	);
};

export default Card;

type AllCardProps = {
	cake: CakeOffer;
};

const AllCard = ({ cake }: AllCardProps) => {
	return (
		<div className={styles.grid}>
			{cake.images.map((image, i) => {
				const keyValue = `${i}-${cake.title}`;
				return <img src={image} alt="cake-picture" key={keyValue} />;
			})}
			<Link className={styles.allButton} to={AppRoute.CATALOG}>
				<span>Открыть все</span>
			</Link>
		</div>
	);
};

export { AllCard };
