import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import DescriptionSegment from '../../components/description-segment/description-segment';
import PickUp from '../../components/pick-up/pick-up';
import Title from '../../components/title/title';
import styles from './contacts-page.module.scss';
import PhoneSegment from './phone-segment/phone-segment';

const ContactsPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<BreadCrumbs />
				<Title titleClass={styles.title} titleText="Контакты" hr />
				<PhoneSegment />
				<DescriptionSegment
					wrapperClass={styles.hours}
					titleClass={styles.hours__title}
					titleText="Часы работы"
					titleLevel="h2"
				>
					<p className={styles.hours__description}>
						Работаем каждый день с 8:00 до 21:00
					</p>
				</DescriptionSegment>
				<PickUp
					wrapperClass={styles.pickup}
					headlineText="Адрес самовывоза"
					isDeliverPage={false}
				/>
			</div>
		</main>
	);
};

export default ContactsPage;
