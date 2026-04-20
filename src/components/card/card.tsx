import { Link } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { CakeOffer } from '../../types/types';
import Button from '../ui/button/button';
import styles from './card.module.scss';

type CardProps = {
	cake: CakeOffer;
	isMainPage: boolean;
};

const Card = ({ cake, isMainPage }: CardProps) => {
	const { title, images, price } = cake;

	const cardLinkClass = isMainPage
		? styles.card
		: `${styles.card} ${styles.card_catalog}`;

	const cardTitleClass = isMainPage
		? styles.title
		: `${styles.title} ${styles.title_catalog}`;
	return (
		<Link to={AppRoute.CAKE_OFFER_ARTICLE} className={cardLinkClass}>
			<div className={styles.imgWrap}>
				<img src={images[0]} alt={title} width="282" height="282" />
			</div>
			<span className={cardTitleClass}>{title}</span>
			<div className={styles.bottom}>
				<span className={styles.cost}>{price} ₽</span>
				<Button
					className={`button button_tertiary ${styles.button}`}
					type="button"
				/>
			</div>
		</Link>
	);
};

export default Card;

type AllCardProps = {
	cake: CakeOffer;
	path?: string;
};

const AllCard = ({ cake, path }: AllCardProps) => {
	return (
		<div className={styles.grid}>
			{cake.images.map((image, i) => {
				const keyValue = `${i}-${cake.title}`;
				return <img src={image} alt="cake" key={keyValue} />;
			})}
			<Link className={styles.allButton} to={path!}>
				<span>Открыть все</span>
			</Link>
		</div>
	);
};

export { AllCard };
