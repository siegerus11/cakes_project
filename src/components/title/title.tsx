import { Link } from 'react-router-dom';

type TitleLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TitleProps = {
	titleText?: string;
	path?: string;
	titleClass?: string;
	level?: TitleLevel;
	hr?: boolean;
};

const Title = ({
	titleText,
	path,
	titleClass,
	level = 'h1',
	hr
}: TitleProps) => {
	const HeadingTag = level;

	const content = (
		<>
			<HeadingTag className={`title ${titleClass}`}>
				{titleText}
			</HeadingTag>
			{hr && <hr className="title-hr" />}
		</>
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
