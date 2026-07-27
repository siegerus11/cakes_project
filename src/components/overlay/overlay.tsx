import { PropsWithChildren, TouchEvent } from 'react';

import styles from './overlay.module.scss';

type OverlayProps = PropsWithChildren<{
	className?: string;
	handleTouchStart?: (e: TouchEvent) => void;
}>;

const Overlay = ({ children, className, handleTouchStart }: OverlayProps) => {
	const overlayClass = className
		? `${styles.overlay} ${className}`
		: styles.overlay;

	return (
		<div
			className={overlayClass}
			onTouchStart={handleTouchStart}
			role="presentation"
		>
			{children}
		</div>
	);
};

export default Overlay;
