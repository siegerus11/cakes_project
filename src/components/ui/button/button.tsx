import { PropsWithChildren, MouseEventHandler } from 'react';
import { Link, useLocation } from 'react-router-dom';

type SubmitButtonProps = PropsWithChildren<{
	className: string;
	formId?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const SubmitButton = ({
	children,
	className,
	onClick,
	formId
}: SubmitButtonProps) => {
	return (
		<div>
			<button
				className={`${className}`}
				type="submit"
				onClick={onClick}
				form={formId}
			>
				{children}
			</button>
		</div>
	);
};

export { SubmitButton };

type ButtonProps = PropsWithChildren<{
	className: string;
	isOuterLink?: boolean;
	url?: string;
	path?: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Button = ({
	children,
	className,
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
				<a className={`${className}`} href={url}>
					{children}
				</a>
			) : (
				<button className={className} type="button" onClick={onClick}>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;