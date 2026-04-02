import { Link } from 'react-router-dom';
import { AppRoute } from '../../../constants';
import styles from './title.module.scss';

type TitleProps = {
	titleText: string;
};

const Title = ({ titleText }: TitleProps) => {
	return (
		<Link className={styles.link} to={AppRoute.CATALOG}>
			<h2 className={styles.title}>{titleText}</h2>
		</Link>
	);
};

export default Title;
