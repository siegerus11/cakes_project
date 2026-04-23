import { MouseEventHandler, PropsWithChildren } from 'react';

import Title from '../title/title';
import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	outerClass: string;
	closeClass?: string;
	onCloseClick: MouseEventHandler<HTMLButtonElement>;
}>;
const Popup = ({
	children,
	outerClass,
	closeClass,
	onCloseClick
}: PopupProps) => {
	return (
		<div className={outerClass}>
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
