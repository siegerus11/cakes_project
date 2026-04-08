import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<div className="page about-page">
			<BreadCrumbs />
		</div>
	);
};

export default AboutPage;
