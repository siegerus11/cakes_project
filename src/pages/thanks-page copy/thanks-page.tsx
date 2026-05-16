import styles from './thanks-page.module.scss';

const ThanksPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<h2 className="visually-hidden">Thanks page</h2>
				<div className={styles.wrapper}>
					<svg className={styles.icon} viewBox="0 0 64 64" aria-hidden="true">
						<use xlinkHref="#smile"></use>
					</svg>
				</div>
			</div>
		</main>
	);
};

export default ThanksPage;
