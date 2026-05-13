import styles from './thanks-page.module.scss';

const ThanksPage = () => {
	return (
		<div className={`page ${styles.page}`}>
			<div className="container">
				<h2 className="visually-hidden">Thanks page</h2>
				<div className={styles.wrapper}>
					<svg className={styles.icon} viewBox="0 0 64 64">
						<use xlinkHref="#smile"></use>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ThanksPage;
