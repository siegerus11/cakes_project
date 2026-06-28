import {
	PropsWithChildren,
	MouseEventHandler,
	TouchEventHandler
} from 'react';

type ActionButtonProps = PropsWithChildren<{
	className: string;
	label?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	onTouchStart?: TouchEventHandler<HTMLButtonElement>;
}>;

const ActionButton = ({
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

export default ActionButton;
