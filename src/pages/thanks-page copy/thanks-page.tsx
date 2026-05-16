import styles from './thanks-page.module.scss';

const ThanksPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<h1 className="visually-hidden">Спасибо за заказ</h1>
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
