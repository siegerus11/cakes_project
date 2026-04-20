import { PropsWithChildren, MouseEventHandler } from 'react';

type ButtonProps = PropsWithChildren<{
	className: string;
	isLink?: boolean;
	url?: string;
	type: 'button' | 'submit' | 'reset' | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Button = ({
	children,
	className,
	isLink,
	url,
	type,
	onClick
}: ButtonProps) => {
	return (
		<div>
			{isLink ? (
				<a className={`${className}`} href={url}>
					{children}
				</a>
			) : (
				<button
					className={`${className}`}
					type={type}
					onClick={onClick}
				>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
