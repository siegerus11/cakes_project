import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import ShoppingCartItem from '../../components/shopping-cart-item/shopping-cart-item';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
import { AppRoute } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import cakeOffers from '../../mocks/cake-offers/cake-offers';
import { selectActiveOffer } from '../../store/main-process/main-process';
import styles from './cake-article-page.module.scss';
import OrderForm from './order-form/order-form';
import Slider from './slider/slider';

const CakeArticlePage = () => {
	const activeId = useAppSelector(selectActiveOffer);
	const activeOffer = useMemo(
		() => cakeOffers.find(offer => offer.id === activeId),
		[activeId]
	);

	const titleClassName = `title_fz30 title_fw800 ${styles.main__title}`;
	const popupClass = `popup ${styles.popup}`;
	const popupClassActive = `popup ${styles.popup} ${styles.popup_active}`;

	const initialprice = useMemo(() => activeOffer?.price, [activeOffer]);

	const filling = useMemo(() => activeOffer?.filling ?? [], [activeOffer]);

	const [visibilityIndex, setVisibilityIndex] = useState<number | null>(null);

	const handleDescribeClick = useCallback((idx: number | null) => {
		setVisibilityIndex(idx);
	}, []);

	if (!activeOffer) {
		return null; // или заглушка
	}

	return (
		<main className={`page ${styles.component}`}>
			<h1 className="visually-hidden">Карточка торта</h1>
			<ShoppingCartItem />
			<div className="container_secondary container">
				<Link
					className={`back-link ${styles.back}`}
					to={AppRoute.Catalog}
				>
					<span>Назад</span>
					<span className={styles.back__item}></span>
				</Link>
				<div className={styles.wrapper}>
					<Slider cake={activeOffer} />
					<section className={styles.main}>
						<div className={styles.main__headline}>
							<Title
								titleText={activeOffer.title}
								titleClass={titleClassName}
							/>
						</div>
						<OrderForm
							cake={activeOffer}
							initialprice={initialprice!}
							onDescribeClick={handleDescribeClick}
						/>
					</section>
				</div>
			</div>
			{filling.map((fillingItem, i) => {
				const keyValue = `${i}-${fillingItem.name}`;
				return (
					i === visibilityIndex && (
						<Overlay key={keyValue}>
							<Popup
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
									to={AppRoute.CakesCatalog}
									aria-label="Назад к каталогу"
								>
									<span aria-hidden="true"></span>
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
											titleClass="title_fz22 title_fw800"
										/>
										<p
											className={
												styles.popup__description
											}
										>
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
										{fillingItem.ingredients && (
											<ul
												className={
													styles.popup__toplist
												}
											>
												{fillingItem.ingredients.map(
													ingridient => (
														<li
															key={`${ingridient}`}
														>
															{ingridient}
														</li>
													)
												)}
											</ul>
										)}
										{fillingItem.nutrition && (
											<ul
												className={
													styles.popup__bottomlist
												}
											>
												<li>
													Калорийность:{' '}
													{
														fillingItem.nutrition
															.calories
													}
												</li>
												<li>
													Белки:{' '}
													{
														fillingItem.nutrition
															.proteins
													}
												</li>
												<li>
													Жиры:{' '}
													{fillingItem.nutrition.fats}
												</li>
												<li>
													Углеводы:{' '}
													{
														fillingItem.nutrition
															.carbs
													}
												</li>
											</ul>
										)}
									</main>
								</div>
							</Popup>
						</Overlay>
					)
				);
			})}
		</main>
	);
};

export default CakeArticlePage;
