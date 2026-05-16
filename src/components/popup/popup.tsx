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
	onCloseClick?: MouseEventHandler<HTMLButtonElement>;
	onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
	onTouchStart?: (e: TouchEvent<HTMLButtonElement>) => void;
	onTouchMove?: (e: TouchEvent<HTMLButtonElement>) => void;
	onTouchEnd?: (e: TouchEvent<HTMLButtonElement>) => void;
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
	const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
		if (onTouchStart) onTouchStart(e);
	};

	const handleTouchMove = (e: TouchEvent<HTMLButtonElement>) => {
		if (onTouchMove) onTouchMove(e);
	};

	const handleTouchEnd = (e: TouchEvent<HTMLButtonElement>) => {
		if (onTouchEnd) onTouchEnd(e);
	};
	return (
		<div
			className={outerClass}
			onAnimationEnd={onAnimationEnd}
			role="dialog"
			aria-modal="true"
		>
			{onCloseClick && (
				<button
					className={closeClass}
					type="button"
					onClick={onCloseClick}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					aria-label="Закрыть"
				>
					<svg className={styles.button__icon} viewBox="0 0 18 18" aria-hidden="true">
						<use xlinkHref="#close"></use>
					</svg>
				</button>
			)}
			{children}
		</div>
	);
};

export default Popup;