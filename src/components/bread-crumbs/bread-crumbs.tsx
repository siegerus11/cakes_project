import { Link, useLocation } from 'react-router-dom';
import { AppRoute, NAVS } from '../../constants';
import { getNavData } from '../../utils/getLinkData';
import styles from './bread-crumbs.module.scss';

type BreadCrumbsProps = {};
const BreadCrumbs = (props: BreadCrumbsProps) => {
	const { pathname } = useLocation();

	const linkTitle = getNavData(pathname, NAVS)!.title;
	const linkPath = getNavData(pathname, NAVS)!.path;

	return (
		<nav className={styles.component}>
			<Link className={styles.link} to={AppRoute.ROOT}>
				Главная
			</Link>
			<Link className={styles.link} to={linkPath}>
				{linkTitle}
			</Link>
		</nav>
	);
};

export default BreadCrumbs;
