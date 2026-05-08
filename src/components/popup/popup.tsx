import { MouseEventHandler, PropsWithChildren, AnimationEvent } from 'react';

import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	outerClass: string;
	closeClass?: string;
	onCloseClick: MouseEventHandler<HTMLButtonElement>;
	onAnimationEnd?: (e: AnimationEvent) => void;
}>;
const Popup = ({
	children,
	outerClass,
	closeClass,
	onCloseClick,
	onAnimationEnd
}: PopupProps) => {
	return (
		<div className={outerClass} onAnimationEnd={onAnimationEnd}>
			<button className={closeClass} type="button" onClick={onCloseClick}>
				<svg className={styles.button__icon} viewBox="0 0 18 18">
					<use xlinkHref="#close"></use>
				</svg>
			</button>
			{children}
		</div>
	);
};

export default Popup;
