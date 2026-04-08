import { Link } from 'react-router-dom';
import { RoutePath } from '../../types/types';
import styles from './title.module.scss';

type TitleProps = {
	titleText: string;
	path: RoutePath;
};

const Title = ({ titleText, path }: TitleProps) => {
	return path ? (
		<Link className={styles.link} to={path}>
			<h2 className={styles.title}>{titleText}</h2>
		</Link>
	) : (
		<h2 className={styles.title}>{titleText}</h2>
	);
};

export default Title;
