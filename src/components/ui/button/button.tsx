import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
	className: string;
	isLink?: boolean;
	url?: string;
}>;

const Button = ({ children, className, isLink, url }: ButtonProps) => {
	return (
		<>
			{isLink ? (
				<a className={`${className}`} href={url}>
					{children}
				</a>
			) : (
				<button className={`${className}`} type="button">
					{children}
				</button>
			)}
		</>
	);
};

export default Button;
