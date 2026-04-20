import { Link } from 'react-router-dom';

import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import Slider from './slider/slider';
import OrderForm from './order-form/order-form';
import styles from './cake-article-page.module.scss';
import { useState } from 'react';
import Button from '../../components/ui/button/button';

const CakeArticlePage = () => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = 'title_fz30 title_fw800';
	const activeOffer = cakeOffers[0];
	const initialprice = activeOffer.price;
	const popupClass = `popup ${styles.popup}`;
	const popupClassActive = `popup ${styles.popup} ${styles.popup_active}`;
	const popupTitleClass = 'title_fz22 title_fw800';

	const { filling } = activeOffer;

	const [visibilityIndex, setVisibilityIndex] = useState<number | null>(null);

	const handleDescribeClick = (idx: number | null) => {
		setVisibilityIndex(idx);
	};

	return (
		<div className={`page ${styles.component}`}>
			<div className="container_secondary container">
				<Link className={styles.back} to={AppRoute.CAKES_CATALOG}>
					Назад
				</Link>
				<div className={styles.wrapper}>
					<Slider cake={activeOffer} />
					<section className={styles.main}>
						<div className={styles.main__headline}>
							<Title
								titleText={pageTitle}
								titleClass={titleClassName}
							/>
						</div>
						<OrderForm
							cake={activeOffer}
							initialprice={initialprice}
							onDescribeClick={handleDescribeClick}
						/>
					</section>
				</div>
			</div>
			{filling.map((fillingItem, i) => {
				const keyValue = `${Math.random() * i}-${fillingItem.name}`;
				return (
					<Popup
						key={keyValue}
						wrappClass={
							i === visibilityIndex
								? `${popupClass} ${popupClassActive}`
								: popupClass
						}
						titleClass={popupTitleClass}
						titleText={fillingItem.title}
						onCloseClick={handleDescribeClick}
						headlineClass={styles.test}
					>
						<p className={styles.popup__description}>
							{fillingItem.description}
						</p>
						<Button
							className={`button button_primary ${styles.popup__button}`}
							type="button"
							onClick={() => handleDescribeClick(null)}
						>
							<span>Понятно, спасибо</span>
						</Button>
						<ul className={styles.popup__toplist}>
							<li>Вишня</li>
							<li>
								Йогуртовый крем на основе натурального йогурта
							</li>
							<li>Сливки</li>
							<li>Бисквит ванильный</li>
							<li>Вишневый сироп</li>
							<li>Сливочное масло</li>
							<li>Натуральный ванилин</li>
						</ul>
						<ul className={styles.popup__bottomlist}>
							<li>Калорийность: 200 ккал</li>
							<li>Белки: 5 г</li>
							<li>Жиры: 12 г</li>
							<li>Углеводы: 20 г</li>
						</ul>
					</Popup>
				);
			})}
		</div>
	);
};

export default CakeArticlePage;
