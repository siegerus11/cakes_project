import { Link, generatePath } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useActionCreators } from '../../hooks/useStore';
import { mainProcessActions } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import Button from '../ui/button/button';
import styles from './card.module.scss';

type CardProps = {
	cake: CakeOffer;
	isMainPage: boolean;
};

const Card = ({ cake, isMainPage }: CardProps) => {
	const { title, images, price } = cake;

	const { setActiveOffer } = useActionCreators(mainProcessActions);

	const handleOfferLinkClick = (id: string) => {
		setActiveOffer(id);
	};
	const cardLinkClass = isMainPage
		? styles.card
		: `${styles.card} ${styles.card_catalog}`;

	const cardTitleClass = isMainPage
		? styles.title
		: `${styles.title} ${styles.title_catalog}`;

	return (
		<Link
			to={generatePath(AppRoute.CakeOfferArticle, { id: cake.id })}
			className={cardLinkClass}
			onClick={() => handleOfferLinkClick(cake.id)}
		>
			<div className={styles.imgWrap}>
				<img src={images[0]} alt={title} width="282" height="282" />
			</div>
			<h3 className={cardTitleClass}>{title}</h3>
			<div className={styles.bottom}>
				<span className={styles.cost}>{price} ₽</span>
				<Button
					className={`button button_tertiary ${styles.button}`}
					label="Добавить в корзину"
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
	const linkTo = path ?? AppRoute.Catalog;
	return (
		<Link className={styles.grid} to={linkTo}>
			{cake.images.map((image, i) => {
				const keyValue = `${i}-${cake.title}`;
				return (
					<img
						src={image}
						alt={`Торт "${cake.title}" - изображение ${i + 1}`}
						width="141"
						height="141"
						key={keyValue}
					/>
				);
			})}
			<div className={styles.allButton}>
				<span>Открыть все</span>
			</div>
		</Link>
	);
};

export { AllCard };
