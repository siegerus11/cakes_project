import { PropsWithChildren, MouseEventHandler } from 'react';

type SubmitButtonProps = PropsWithChildren<{
	className: string;
	onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}>;

const SubmitButton = ({
	children,
	className,
	onClick
}: SubmitButtonProps) => {
	return (
		<div>
				<button
					className={`${className}`}
					type="submit"
					onClick={onClick}
				>
					{children}
				</button>
		</div>
	);
};

export {SubmitButton};

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



