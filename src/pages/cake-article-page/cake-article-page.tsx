import { useState } from 'react';
import { Link } from 'react-router-dom';

import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
import ButtonController from '../../components/button-controller/button-controller';
import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import styles from './cake-article-page.module.scss';
import OrderForm from './order-form/order-form';
import Slider from './slider/slider';

const CakeArticlePage = () => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = `title_fz30 title_fw800 ${styles.main__title}`;
	const activeOffer = cakeOffers[0];
	const initialprice = activeOffer.price;
	const popupClass = `popup ${styles.popup}`;
	const popupClassActive = `popup ${styles.popup} ${styles.popup_active}`;
	const popupTitleClass = 'title_fz22 title_fw800';
	const buttonClass = `button button_primary ${styles.controller__button}`;

	const { filling } = activeOffer;

	const [visibilityIndex, setVisibilityIndex] = useState<number | null>(null);

	const handleDescribeClick = (idx: number | null) => {
		setVisibilityIndex(idx);
	};

	return (
		<>
			<div className={`page ${styles.component}`}>
				<div className="container_secondary container">
					<Link className={styles.back} to={AppRoute.CAKES_CATALOG}>
						<span>Назад</span>
						<span className={styles.back__item}></span>
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
							closeClass={styles.popup__close}
							outerClass={
								i === visibilityIndex
									? `${popupClass} ${popupClassActive}`
									: popupClass
							}
							onCloseClick={() => handleDescribeClick(null)}
						>
							<Link
								className={styles.popup__back}
								to={AppRoute.CAKES_CATALOG}
							>
								<span></span>
							</Link>
							<div className={styles.popup__wrapper}>
								<div className={styles.popup__image}>
									<img
										src={fillingItem.image}
										alt="filling"
										width="360"
										height="360"
									/>
								</div>
								<main className={styles.popup__main}>
									<Title
										titleText={fillingItem.title}
										titleClass={popupTitleClass}
									/>
									<p className={styles.popup__description}>
										{fillingItem.description}
									</p>
									<Button
										className={`button button_primary ${styles.popup__button}`}
										onClick={() =>
											handleDescribeClick(null)
										}
									>
										<span>Понятно, спасибо</span>
									</Button>
									<ul className={styles.popup__toplist}>
										<li>Вишня</li>
										<li>
											Йогуртовый крем на основе
											натурального йогурта
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
								</main>
							</div>
						</Popup>
					);
				})}
			</div>
			<ButtonController>
				<div className={styles.controller}>
					<span className={styles.controller__price}>
						{initialprice} ₽
					</span>
					<Button className={buttonClass}>
						<span>В корзину</span>
					</Button>
				</div>
			</ButtonController>
		</>
	);
};

export default CakeArticlePage;
