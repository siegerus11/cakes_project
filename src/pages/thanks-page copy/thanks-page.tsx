import styles from './thanks-page.module.scss';

import Title from '../../components/title/title';

const ThanksPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<Title titleText="Спасибо за заказ" titleClass={styles.title} level="h1" />
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
