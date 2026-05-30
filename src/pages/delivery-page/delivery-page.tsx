import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import DescriptionSegment from '../../components/description-segment/description-segment';
import PickUp from '../../components/pick-up/pick-up';
import Questions from '../../components/questions/questions';
import Title from '../../components/title/title';
import { deliveryTimes, ABOUT_QUESTIONS, OuterRoute } from '../../constants';
import styles from './delivery-page.module.scss';

const DeliveryPage = () => {
	return (
		<div className={`page ${styles.page}`}>
			<div className="container">
				<BreadCrumbs />
				<Title
					titleText="Доставка и оплата"
					titleClass={styles.title}
					hr
				/>

				<DescriptionSegment
					titleText="Курьерская доставка"
					wrapperClass={styles.courier}
				>
					<p className={styles.courier__interval}>
						Интервалы доставки:
					</p>
					<ul className={styles.courier__list}>
						{deliveryTimes.map((time, index) => {
							const keyValue = `${index}-${time}`;
							return (
								<li
									key={keyValue}
									className={styles.courier__item}
								>
									{time}
								</li>
							);
						})}
					</ul>
					<p className={styles.courier__description}>
						Стоимость доставки зависит от удаленности от
						кондитерской:
					</p>
				</DescriptionSegment>
				<PickUp
					wrapperClass={styles.pickup}
					isDeliverPage
					headlineText="Самовывоз"
				/>
				<DescriptionSegment
					wrapperClass={styles.payment}
					titleText="Оплата"
				>
					<p className={styles.payment__description}>
						Готовить заказ мы начинаем после 100% предоплаты
						переводом на карту.
					</p>
				</DescriptionSegment>
				<Questions
					questions={ABOUT_QUESTIONS}
					wrapperClass={styles.questions}
				/>

				<DescriptionSegment
					titleText="Остались вопросы?"
					wrapperClass={styles.left}
				>
					<a href={OuterRoute.Telegram} className={styles.left__link}>
						Напишите в Telegram
					</a>
				</DescriptionSegment>
			</div>
		</div>
	);
};

export default DeliveryPage;
