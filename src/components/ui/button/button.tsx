import { PropsWithChildren, MouseEventHandler } from 'react';

type ButtonProps = PropsWithChildren<{
	className: string;
	isLink?: boolean;
	url?: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const Button = ({
	children,
	className,
	isLink,
	url,
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
