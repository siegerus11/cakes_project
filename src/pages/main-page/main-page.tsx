import { Link } from 'react-router-dom';

import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { CakeOffer } from '../../types/types';
import CardsList from '../../components/cards-list/cards-list';
import Clauses from '../../components/clause/clauses';
import ButtonController from '../../components/button-controller/button-controller';
import Button from '../../components/ui/button/button';
import styles from './main-page.module.scss';

type MainPageProps = {
	cakes: CakeOffer[];
	bentoCakes: CakeOffer[];
};

const MainPage = ({ cakes, bentoCakes }: MainPageProps) => {
	const splicedCakes = [...cakes].splice(0, 3);
	const splicedBentoCakes = [...bentoCakes].splice(0, 3);

	return (
		<>
			<div className="container">
				<h1 className="visually-hidden">Cackes</h1>
				<div className={`page ${styles.component}`}>
					<section className={styles.primary}>
						<div className={styles.headline}>
							<Title
								titleClass="title_wth-arrow"
								titleText={'Торты'}
								path={AppRoute.CAKES_CATALOG}
							/>
							<Link
								to={AppRoute.CAKES_CATALOG}
								className={styles.headline__link}
							>
								Открыть все
							</Link>
						</div>
						<CardsList
							isMainPage
							cakes={splicedCakes}
							path={AppRoute.CAKES_CATALOG}
						/>
					</section>
					<section className={styles.secondary}>
						<div className={styles.headline}>
							<Title
								titleClass="title_wth-arrow"
								titleText={'Бенто-торты'}
								path={AppRoute.BENTO_CAKES_CATALOG}
							/>
							<Link
								to={AppRoute.BENTO_CAKES_CATALOG}
								className={styles.headline__link}
							>
								Открыть все
							</Link>
						</div>
						<CardsList
							isMainPage
							cakes={splicedBentoCakes}
							path={AppRoute.BENTO_CAKES_CATALOG}
						/>
					</section>
					<Clauses />
				</div>
			</div>
			<ButtonController>
				<Button className={`button button_primary ${styles.button}`}>
					<svg className={styles.button__icon} viewBox="0 0 40 40">
						<use xlinkHref="#cart"></use>
					</svg>
					<span className={styles.button__text}>Оформить заказ</span>
					<span className={styles.button__price}>6 800 ₽</span>
				</Button>
			</ButtonController>
		</>
	);
};

export default MainPage;
