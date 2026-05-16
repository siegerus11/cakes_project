import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<main className={`page ${styles.page}`}>
			<h1 className="visually-hidden">О нас</h1>
			<p>AboutPage</p>
			<BreadCrumbs />
		</main>
	);
};

export default AboutPage;
