import { Link } from 'react-router-dom';
import { AppRoute } from '../../../constants';
import styles from './title.module.scss';

type TitleProps = {
	titleText: string;
	path: (typeof AppRoute)[keyof typeof AppRoute];
};

const Title = ({ titleText, path }: TitleProps) => {
	return (
		<Link className={styles.link} to={path}>
			<h2 className={styles.title}>{titleText}</h2>
		</Link>
	);
};

export default Title;
