import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
	className: string;
	isLink?: boolean;
	url?: string;
	type: 'button' | 'submit' | 'reset' | undefined;
}>;

const Button = ({ children, className, isLink, url, type }: ButtonProps) => {
	return (
		<div>
			{isLink ? (
				<a className={`${className}`} href={url}>
					{children}
				</a>
			) : (
				<button className={`${className}`} type={type}>
					{children}
				</button>
			)}
		</div>
	);
};

export default Button;
