import { Link, useLocation } from 'react-router-dom';
import { Nav } from '../../types/types';
import { AppRoute, NAVS } from '../../constants';
import { getLinkData } from '../../utils/getLinkData';
import styles from './bread-crumbs.module.scss';

type BreadCrumbsProps = {};
const BreadCrumbs = (props: BreadCrumbsProps) => {
	const { pathname } = useLocation();

	const linkTitle = getLinkData(pathname, NAVS)?.title;
	const linkPath = getLinkData(pathname, NAVS)?.path;

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
