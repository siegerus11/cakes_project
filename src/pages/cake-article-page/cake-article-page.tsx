import { Link } from 'react-router-dom';

import Popup from '../../components/popup/popup';
import Title from '../../components/title/title';
import { AppRoute } from '../../constants';
import { cakeOffers } from '../../mocks/cake-offers/cake-offers';
import Slider from './slider/slider';
import OrderForm from './order-form/order-form';
import styles from './cake-article-page.module.scss';
import { useState } from 'react';

const CakeArticlePage = () => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = 'title_fz30 title_fw800';
	const activeOffer = cakeOffers[0];
	const initialprice = activeOffer.price;
	const popupClass = `popup ${styles.popup}`;
	const popupTitleClass = 'title_fz22 title_fw800';

	const { filling } = activeOffer;

	const [visibilityIndex, setVisibilityIndex] = useState<number>(0);

	const handleDescribeClick = (idx: number) => {
		console.log(idx);
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
						wrappClass={popupClass}
						titleClass={popupTitleClass}
						titleText={fillingItem.title}
					></Popup>
				);
			})}
		</div>
	);
};

export default CakeArticlePage;
