import { PropsWithChildren, MouseEventHandler } from 'react';

type SubmitButtonProps = PropsWithChildren<{
	label?: string;
	className: string;
	formId?: string;
	isDisabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

const SubmitButton = ({
	children,
	label,
	className,
	isDisabled = false,
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
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default SubmitButton;
