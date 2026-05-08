import {
	MouseEventHandler,
	PropsWithChildren,
	AnimationEvent,
	TouchEvent
} from 'react';

import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	outerClass: string;
	closeClass?: string;
	onCloseClick: MouseEventHandler<HTMLButtonElement>;
	onAnimationEnd?: (e: AnimationEvent) => void;
	onTouchStart?: (e: TouchEvent) => void;
	onTouchMove?: (e: TouchEvent) => void;
	onTouchEnd?: (e: TouchEvent) => void;
}>;
const Popup = ({
	children,
	outerClass,
	closeClass,
	onCloseClick,
	onAnimationEnd,
	onTouchStart,
	onTouchMove,
	onTouchEnd
}: PopupProps) => {
	const handleTouchStart = (e: TouchEvent) => {
		if (onTouchStart) onTouchStart(e);
	};

	const handleTouchMove = (e: TouchEvent) => {
		if (onTouchMove) onTouchMove(e);
	};

	const handleTouchEnd = (e: TouchEvent) => {
		if (onTouchEnd) onTouchEnd(e);
	};
	return (
		<div className={outerClass} onAnimationEnd={onAnimationEnd}>
			<button
				className={closeClass}
				type="button"
				onClick={onCloseClick}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				<svg className={styles.button__icon} viewBox="0 0 18 18">
					<use xlinkHref="#close"></use>
				</svg>
			</button>
			{children}
		</div>
	);
};

export default Popup;
