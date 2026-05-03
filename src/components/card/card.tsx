import { Link, generatePath } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useAppDispatch } from '../../hooks/useStore';
import { setActiveOffer } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import Button from '../ui/button/button';
import styles from './card.module.scss';

type CardProps = {
	cake: CakeOffer;
	isMainPage: boolean;
};

const Card = ({ cake, isMainPage }: CardProps) => {
	const { title, images, price } = cake;

	const dispatch = useAppDispatch();

	const handleOfferLinkClick = (id: string) => {
		dispatch(setActiveOffer(id));
	};
	const cardLinkClass = isMainPage
		? styles.card
		: `${styles.card} ${styles.card_catalog}`;

	const cardTitleClass = isMainPage
		? styles.title
		: `${styles.title} ${styles.title_catalog}`;

	return (
		<Link
			to={generatePath(AppRoute.CAKE_OFFER_ARTICLE, { id: cake.id })}
			className={cardLinkClass}
			onClick={() => handleOfferLinkClick(cake.id)}
		>
			<div className={styles.imgWrap}>
				<img src={images[0]} alt={title} width="282" height="282" />
			</div>
			<span className={cardTitleClass}>{title}</span>
			<div className={styles.bottom}>
				<span className={styles.cost}>{price} ₽</span>
				<Button className={`button button_tertiary ${styles.button}`} />
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
