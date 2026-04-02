import { MutableRefObject, useRef } from 'react';
import styles from './hamburger.module.scss';

type HamburgerProps = {
	isPopup?: boolean;
	onHamburgerClick: () => void;
};

const Hamburger = ({ onHamburgerClick, isPopup }: HamburgerProps) => {
	const hamburgerRef = useRef<HTMLButtonElement | null>(null);
	const handleHamburgerClick = () => onHamburgerClick();

	return (
		<button
			className={
				isPopup
					? `${styles.wrapper} ${styles.wrapper_asEnd}`
					: styles.wrapper
			}
			onClick={() => handleHamburgerClick()}
		>
			<div className={styles.item}></div>
			<div className={styles.item}></div>
			<div className={styles.item}></div>
		</button>
	);
};

export default Hamburger;
