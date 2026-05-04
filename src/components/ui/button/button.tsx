import { PropsWithChildren, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '../../../constants';

type SubmitButtonProps = PropsWithChildren<{
	className: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const SubmitButton = ({ children, className, onClick }: SubmitButtonProps) => {
	return (
		<div>
			<button className={`${className}`} type="submit" onClick={onClick}>
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
	return path ? (
		<Link className={`${className}`} to={path}>
			{children}
		</Link>
	) : (
		<div>
			{isOuterLink ? (
				<a className={`${className}`} href={url}>
					{children}
				</a>
			) : (
				<button
					className={`${className}`}
					type="button"
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
