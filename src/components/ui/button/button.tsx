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

	return path ? (
		<Link
			className={className}
			to={path}
			state={{ from: location.pathname }}
		>
			{children}
		</Link>
	) : (
		<div>
			{isOuterLink ? (
				<a className={`${className}`} href={url} aria-label={label}>
					{children}
				</a>
			) : (
				<button
					className={className}
					type="button"
					onClick={onClick}
					aria-label={label}
				>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
