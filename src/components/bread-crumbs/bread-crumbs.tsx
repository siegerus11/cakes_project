import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants';
import styles from './bread-crumbs.module.scss';

type Props = {};

const BreadCrumbs = (props: Props) => {
	return (
		<div className={styles.component}>
			<Link className={styles.link} to={AppRoute.ROOT}>
				Главная
			</Link>
		</div>
	);
};

export default BreadCrumbs;
