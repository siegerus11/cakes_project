import { Link } from 'react-router-dom';

import Button from '../../components/ui/button/button';
import OrderForm from './order-form/order-form';
import Slider from './slider/slider';
import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import styles from './cake-article-page.module.scss';

type CakeArticlePageProps = {};

const CakeArticlePage = (props: CakeArticlePageProps) => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = 'title_fz30 title_fw800';
	const activeOffer = cakeOffers[0];

	return (
		<div className={`page ${styles.component}`}>
			<div className="container_secondary container">
				<Link className={styles.back} to={AppRoute.CAKES_CATALOG}>
					Назад
				</Link>
				<div className={styles.wrapper}>
					<Slider />
					<section className={styles.main}>
						<div className={styles.main__headline}>
							<Title
								titleText={pageTitle}
								titleClass={titleClassName}
							/>
							<div className={styles.adder}>
								<span className={styles.adder__price}>
									4 600 ₽
								</span>
								<Button
									className={`button button_primary ${styles.button}`}
								>
									<span>Добавить в корзину</span>
								</Button>
							</div>
						</div>
						<OrderForm cake={activeOffer} />
					</section>
				</div>
			</div>
		</div>
	);
};

export default CakeArticlePage;
