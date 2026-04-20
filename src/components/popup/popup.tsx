import { PropsWithChildren } from 'react';
import Title from '../title/title';
import styles from './popup.module.scss';

type PopupProps = PropsWithChildren<{
	titleText: string;
	titleClass: string;
	wrappClass: string;
	headlineClass: string;
	onCloseClick: (idx: number | null) => void;
}>;

const Popup = ({
	children,
	titleText,
	titleClass,
	wrappClass,
	headlineClass,
	onCloseClick
}: PopupProps) => {
	const wrapperClass = `${wrappClass}`;
	return (
		<div className={wrapperClass}>
			<div className={`${styles.headline} ${headlineClass}`}>
				<Title titleText={titleText} titleClass={titleClass} />
				<button
					className={styles.button}
					type="button"
					onClick={() => onCloseClick(null)}
				>
					<svg className={styles.button__icon} viewBox="0 0 18 18">
						<use xlinkHref="#close"></use>
					</svg>
				</button>
			</div>
			{children}
		</div>
	);
};

export default Popup;
