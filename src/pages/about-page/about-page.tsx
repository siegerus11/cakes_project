import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<main className="page about-page">
			<p>AboutPage</p>
			<BreadCrumbs />
		</main>
	);
};

export default AboutPage;
