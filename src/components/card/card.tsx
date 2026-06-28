import { memo } from 'react';
import { Link, generatePath } from 'react-router-dom';

import { AppRoute } from '../../constants';
import { useActionCreators } from '../../hooks/useStore';
import { mainProcessActions } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import { ActionButton } from '../ui/button/button';
import styles from './card.module.scss';

type CardProps = {
	cake: CakeOffer;
	isMainPage: boolean;
};

const Card = memo(({ cake, isMainPage }: CardProps) => {
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
				<img src={images[0]} alt={title} width="282" height="282" loading="lazy" />
			</div>
			<h3 className={cardTitleClass}>{title}</h3>
			<div className={styles.bottom}>
				<span className={styles.cost}>{price} ₽</span>
				<ActionButton
					className={`button button_tertiary ${styles.button}`}
					label="Добавить в корзину"
				/>
			</div>
		</Link>
	);
});

export default Card;

type AllCardProps = {
	images: string[] | undefined;
	path?: string;
};

const AllCard = ({ images, path }: AllCardProps) => {
	const linkTo = path ?? AppRoute.Catalog;

	return (
		<Link className={styles.grid} to={linkTo}>
			{images?.map((image, i) => {
				const keyValue = `${i}-${image}`;
				return (
					<img
						src={image}
						alt={`Торт "${image}" - изображение ${i + 1}`}
						width="141"
						height="141"
						loading="lazy"
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
