import { Link } from 'react-router-dom';

import { RoutePath } from '../../types/types';

type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleProps = {
	titleText?: string;
	path?: RoutePath;
	titleClass?: string;
	level?: TitleLevel;
};

const Title = ({ titleText, path, titleClass, level = 'h1' }: TitleProps) => {
	const HeadingTag = level;

	const content = (
		<HeadingTag className={`title ${titleClass}`}>{titleText}</HeadingTag>
	);

	return path ? (
		<Link className="title-link" to={path}>
			{content}
		</Link>
	) : (
		content
	);
};

export default Title;
