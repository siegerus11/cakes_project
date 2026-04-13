import styles from './slider.module.scss';

const Slider = () => {
	return (
		<div className={styles.component}>
			<div className={styles.wrapper}></div>
			<button className={styles.back} type="button"></button>
			<button className={styles.forwars} type="button"></button>
			<div className={styles.dots}>
				<button></button>
				<button></button>
				<button></button>
				<button></button>
			</div>
		</div>
	);
};

export default Slider;
