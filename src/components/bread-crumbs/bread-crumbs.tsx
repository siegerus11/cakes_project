import { Link, useLocation } from 'react-router-dom';

import { AppRoute, NAVS } from '../../constants';
import getNavData from '../../utils/getNavData';
import styles from './bread-crumbs.module.scss';

const BreadCrumbs = () => {
	const { pathname } = useLocation();

	const navData = getNavData(pathname, NAVS);

	if (!navData) {
		// Если навигационные данные не найдены, не отображаем крошки
		return null;
	}

	const { title, path } = navData;

	return (
		<nav className={styles.component} aria-label="Хлебные крошки">
			<Link className={styles.link} to={AppRoute.Root}>
				Главная
			</Link>
			<Link className={styles.link} to={path} aria-current="page">
				{title}
			</Link>
		</nav>
	);
};

export default BreadCrumbs;
