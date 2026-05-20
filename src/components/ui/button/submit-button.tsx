import { PropsWithChildren, MouseEventHandler } from 'react';

type SubmitButtonProps = PropsWithChildren<{
	label?: string;
	className: string;
	formId?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const SubmitButton = ({
	children,
	label,
	className,
	onClick,
	formId
}: SubmitButtonProps) => {
	return (
		<button
			className={`${className}`}
			type="submit"
			onClick={onClick}
			form={formId}
			aria-label={label}
		>
			{children}
		</button>
	);
};

export default SubmitButton;
