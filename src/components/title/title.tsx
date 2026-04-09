import { Link } from 'react-router-dom';
import { RoutePath } from '../../types/types';
import styles from './title.module.scss';

type TitleProps = {
	titleText: string;
	path?: RoutePath;
	titleClass?: string;
};

const Title = ({ titleText, path, titleClass }: TitleProps) => {
	return path ? (
		<Link className={`title-link`} to={path}>
			<h2 className={`title ${titleClass}`}>{titleText}</h2>
		</Link>
	) : (
		<h2 className={`title ${titleClass}`}>{titleText}</h2>
	);
};

export default Title;
