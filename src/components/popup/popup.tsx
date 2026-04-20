import { PropsWithChildren } from 'react';
import Title from '../title/title';
import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	titleText: string;
	titleClass: string;
	wrappClass: string;
}>;

const Popup = ({ children, titleText, titleClass, wrappClass }: PopupProps) => {
	const wrapperClass = `${wrappClass}`;
	return (
		<div className={wrapperClass}>
			<div className={styles.headline}>
				<Title titleText={titleText} titleClass={titleClass} />
			</div>
			{children}
		</div>
	);
};

export default Popup;
