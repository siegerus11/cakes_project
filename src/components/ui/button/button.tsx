import { PropsWithChildren, MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';

type ButtonProps = PropsWithChildren<{
	label?: string;
	className: string;
	isOuterLink?: boolean;
	url?: string;
	path?: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Button = ({
	children,
	className,
	label,
	isOuterLink,
	url,
	onClick,
	path
}: ButtonProps) => {
	const location = useLocation();

	if (path) {
		return (
			<Link
				className={className}
				to={path}
				state={{ from: location.pathname }}
			>
				{children}
			</Link>
		);
	}

	if (isOuterLink) {
		return (
			<a className={className} href={url} aria-label={label}>
				{children}
			</a>
		);
	}

	return (
		<button
			className={className}
			type="button"
			onClick={onClick}
			aria-label={label}
		>
			{children}
		</button>
	);
};

export default Button;
