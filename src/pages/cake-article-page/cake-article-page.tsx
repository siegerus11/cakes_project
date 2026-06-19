import { useState, useMemo, useCallback, AnimationEvent } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import Overlay from '../../components/overlay/overlay';
import Popup from '../../components/popup/popup';
import ShoppingCartItem from '../../components/shopping-cart-item/shopping-cart-item';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
import { AppRoute } from '../../constants';
import useAnimate from '../../hooks/useAnimate';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useAppSelector } from '../../hooks/useStore';
import useTouch from '../../hooks/useTouch';
import { selectCakeOffers } from '../../store/cake-offers-data/cake-offers-data';
import { selectActiveOffer } from '../../store/main-process/main-process';
import styles from './cake-article-page.module.scss';
import OrderForm from './order-form/order-form';
import Slider from './slider/slider';

const CakeArticlePage = () => {
	const isMobile = useMediaQuery('(max-width: 576px)');
	const navigate = useNavigate();

	const cakeOffers = useAppSelector(selectCakeOffers);
	const activeId = useAppSelector(selectActiveOffer);
	const activeOffer = useMemo(
		() => cakeOffers.find(offer => offer.id === activeId),
		[activeId, cakeOffers]
	);

	const { handleAnimationEnd, handleAnimationStart, getAnimationClass } =
		useAnimate();
	const [visibilityIndex, setVisibilityIndex] = useState<number | null>(null);

	const popupClass = getAnimationClass(
		`popup ${styles.popup}`,
		styles.popup_closing
	);

	const overlayClass = getAnimationClass(
		styles.overlay,
		styles.overlay_closing
	);

	const initialPrice = useMemo(() => activeOffer?.price ?? 0, [activeOffer]);

	const filling = useMemo(() => activeOffer?.filling ?? [], [activeOffer]);

	const handleDescribeClick = useCallback((idx: number | null) => {
		setVisibilityIndex(idx);
	}, []);

	const handlePopupClickClose = useCallback(() => {
		if (!isMobile) {
			handleAnimationStart();
		}
	}, [handleAnimationStart, isMobile]);

	const handlePopupTouchClose = () => {
		handleAnimationStart();
	};

	const handlePopupAnimationEnd = useCallback(
		(e: AnimationEvent) => {
			if (e.animationName === styles.fadeOut) {
				setVisibilityIndex(null);
				handleAnimationEnd();
			}
			if (e.animationName === styles.heightOut) {
				setVisibilityIndex(null);
				handleAnimationEnd();
			}
		},
		[handleAnimationEnd]
	);

	const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch(
		handlePopupTouchClose
	);

	const handleTouchBack = () => {
		navigate(-1);
	};

	const touchBack = useTouch(handleTouchBack);

	if (!activeOffer) {
		return <Navigate to={AppRoute.Catalog} replace />;
	}

	return (
		<main className={`page ${styles.component}`}>
			<ShoppingCartItem fixed className={styles.cart} />
			<div className="container_secondary container">
				<Link
					className={`back-link ${styles.back}`}
					to={isMobile ? AppRoute.CakeOfferArticle : AppRoute.Catalog}
					onTouchStart={touchBack.handleTouchStart}
					onTouchMove={touchBack.handleTouchMove}
					onTouchEnd={touchBack.handleTouchEnd}
				>
					<svg viewBox="0 0 18 18" aria-hidden="true">
						<use xlinkHref="#nav-arrow-big" />
					</svg>
					<span>Назад</span>
					<span className={styles.back__item}></span>
				</Link>
				<div className={styles.wrapper}>
					<Slider cake={activeOffer} />
					<section className={styles.main}>
						<div className={styles.main__headline}>
							<Title
								titleText={activeOffer.title}
								titleClass={`title_fz30 title_fw800 ${styles.main__title}`}
								level="h1"
							/>
						</div>
						<OrderForm
							cake={activeOffer}
							initialPrice={initialPrice}
							onDescribeClick={handleDescribeClick}
						/>
					</section>
				</div>
			</div>
			{filling.map((fillingItem, i) => {
				const keyValue = `${i}-${fillingItem.name}`;
				return (
					i === visibilityIndex && (
						<Overlay key={keyValue} className={overlayClass}>
							<Popup
								closeClass={styles.popup__close}
								outerClass={popupClass}
								onCloseClick={handlePopupClickClose}
								onTouchStart={handleTouchStart}
								onTouchMove={handleTouchMove}
								onTouchEnd={handleTouchEnd}
								onAnimationEnd={handlePopupAnimationEnd}
							>
								<div className={styles.popup__wrapper}>
									<div className={styles.popup__image}>
										<img
											src={fillingItem.image}
											alt="filling"
											width="464"
											height="464"
										/>
									</div>
									<main className={styles.popup__main}>
										<Title
											titleText={fillingItem.title}
											titleClass={`title_fz22 title_fw800 ${styles.popup__title}`}
											level="h2"
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
											onClick={handlePopupClickClose}
											onTouchStart={handlePopupTouchClose}
											label="Понятно, спасибо"
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
													ingredient => (
														<li
															key={`${ingredient}`}
														>
															{ingredient}
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
