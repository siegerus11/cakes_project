import styles from './hamburger.module.scss';

type HamburgerProps = {
	isPopup?: boolean;
	onHamburgerClick: () => void;
};

const Hamburger = ({ onHamburgerClick, isPopup }: HamburgerProps) => {
	const handleHamburgerClick = () => onHamburgerClick();

	return (
		<button
			className={
				isPopup
					? `${styles.wrapper} ${styles.wrapper_asEnd}`
					: styles.wrapper
			}
			onClick={() => handleHamburgerClick()}
			type="button"
		>
			<div className={styles.item}></div>
			<div className={styles.item}></div>
			<div className={styles.item}></div>
		</button>
	);
};

export default Hamburger;
