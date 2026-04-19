import { Link } from 'react-router-dom';

import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import Slider from './slider/slider';
import OrderForm from './order-form/order-form';
import styles from './cake-article-page.module.scss';

type CakeArticlePageProps = {};

const CakeArticlePage = (props: CakeArticlePageProps) => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = 'title_fz30 title_fw800';
	const activeOffer = cakeOffers[0];
	const initialprice = activeOffer.price;

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
						</div>
						<OrderForm
							cake={activeOffer}
							initialprice={initialprice}
						/>
						<p className={styles.describe}>
							{activeOffer.describe}
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default CakeArticlePage;
