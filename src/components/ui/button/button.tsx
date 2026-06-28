import {
	PropsWithChildren,
	MouseEventHandler,
	TouchEventHandler
} from 'react';
import { Link, useLocation } from 'react-router-dom';

type LinkButtonProps = PropsWithChildren<{
	className: string;
	path: string;
	label?: string;
}>;

export const LinkButton = ({
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

type OuterLinkButtonProps = PropsWithChildren<{
	className: string;
	url: string;
	label?: string;
}>;

export const OuterLinkButton = ({
	children,
	className,
	url,
	label
}: OuterLinkButtonProps) => (
	<a className={className} href={url} aria-label={label}>
		{children}
	</a>
);

type ActionButtonProps = PropsWithChildren<{
	className: string;
	label?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onTouchStart?: TouchEventHandler<HTMLButtonElement>;
}>;

export const ActionButton = ({
	children,
	className,
	label,
	onClick,
	onTouchStart
}: ActionButtonProps) => (
	<button
		className={className}
		type="button"
		onClick={onClick}
		onTouchStart={onTouchStart}
		aria-label={label}
	>
		{children}
	</button>
);
