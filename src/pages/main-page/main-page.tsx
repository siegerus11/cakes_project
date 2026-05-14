import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import ButtonController from '../../components/button-controller/button-controller';
import CardsList from '../../components/cards-list/cards-list';
import Clauses from '../../components/clause/clauses';
import Title from '../../components/title/title';
import Button from '../../components/ui/button/button';
import { AppRoute, NAVS } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectFinalSum } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import getFormattedPrice from '../../utils/getFormattedPrice';
import styles from './main-page.module.scss';

type MainPageProps = {
	cakes: CakeOffer[];
	bentoCakes: CakeOffer[];
};

const MainPage = ({ cakes, bentoCakes }: MainPageProps) => {
	const totalPrice = useAppSelector(selectFinalSum);
	const formattedPrice = useMemo(
		() => getFormattedPrice(totalPrice),
		[totalPrice]
	);

	const splicedCakes = useMemo(() => cakes.slice(0, 3), [cakes]);
	const splicedBentoCakes = useMemo(
		() => bentoCakes.slice(0, 3),
		[bentoCakes]
	);

	const cakesTitle = useMemo(
		() => NAVS.find(nav => nav.title === 'Торты')?.title,
		[]
	);
	const bentoTitle = useMemo(
		() => NAVS.find(nav => nav.title === 'Бенто-торты')?.title,
		[]
	);

	return (
		<>
			<div className="container">
				<h1 className="visually-hidden">Cackes</h1>
				<div className={`page ${styles.component}`}>
					<section className={styles.primary}>
						<div className={styles.headline}>
							<Title
								titleClass="title_wth-arrow"
								titleText={cakesTitle}
								path={AppRoute.CakesCatalog}
							/>
							<Link
								to={AppRoute.CakesCatalog}
								className={styles.headline__link}
							>
								Открыть все
							</Link>
						</div>
						<CardsList
							isMainPage
							cakes={splicedCakes}
							path={AppRoute.CakesCatalog}
						/>
					</section>
					<section className={styles.secondary}>
						<div className={styles.headline}>
							<Title
								titleClass="title_wth-arrow"
								titleText={bentoTitle}
								path={AppRoute.BentoCakesCatalog}
							/>
							<Link
								to={AppRoute.BentoCakesCatalog}
								className={styles.headline__link}
							>
								Открыть все
							</Link>
						</div>
						<CardsList
							isMainPage
							cakes={splicedBentoCakes}
							path={AppRoute.BentoCakesCatalog}
						/>
					</section>
					<Clauses />
				</div>
			</div>
			<ButtonController outerClass={styles.controller}>
				<Button
					className={`button button_primary ${styles.button}`}
					path={AppRoute.ShoppingCart}
				>
					<svg className={styles.button__icon} viewBox="0 0 40 40">
						<use xlinkHref="#cart"></use>
					</svg>
					<span
						className={`${styles.button__text} ${
							!totalPrice ? styles.button__text_ml0 : ''
						}`}
					>
						Оформить заказ
					</span>
					{totalPrice ? (
						<span
							className={`${styles.button__price} ${styles.button__text_ml0}`}
						>
							{formattedPrice} ₽
						</span>
					) : null}
				</Button>
			</ButtonController>
		</>
	);
};

export default MainPage;
