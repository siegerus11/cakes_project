import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

type LinkButtonProps = PropsWithChildren<{
	className: string;
	path: string;
	label?: string;
}>;

const LinkButton = ({
	children,
	className,
	path,
	label
}: LinkButtonProps) => {
	const location = useLocation();

	return (
		<Link
			className={className}
			to={path}
			state={{ from: location.pathname }}
			aria-label={label}
		>
			{children}
		</Link>
	);
};

export default LinkButton;
