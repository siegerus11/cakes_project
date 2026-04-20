import { PropsWithChildren } from 'react';
import Title from '../title/title';
import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	titleText: string;
	titleClass: string;
	wrappClass: string;
	onCloseClick: (idx: number | null) => void;
}>;

const Popup = ({
	children,
	titleText,
	titleClass,
	wrappClass,
	onCloseClick
}: PopupProps) => {
	const wrapperClass = `${wrappClass}`;
	return (
		<div className={wrapperClass}>
			<div className={styles.headline}>
				<Title titleText={titleText} titleClass={titleClass} />
				<button type="button" onClick={() => onCloseClick(null)}>
					Close
				</button>
			</div>
			{children}
		</div>
	);
};

export default Popup;
