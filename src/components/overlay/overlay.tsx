import { PropsWithChildren } from 'react';

import styles from './overlay.module.scss';

type OverlayProps = PropsWithChildren<{
	className?: string;
}>;

const Overlay = ({ children, className }: OverlayProps) => {
	const overlayClass = className
		? `${styles.overlay} ${className}`
		: styles.overlay;

	return (
		<div className={overlayClass} role="presentation">
			{children}
		</div>
	);
};

export default Overlay;
