import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
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
			</div>
		</main>
	);
};

export default ContactsPage;
