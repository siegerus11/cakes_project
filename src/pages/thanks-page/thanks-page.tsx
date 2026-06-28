import Title from '../../components/title/title';
import LinkButton from '../../components/ui/button/link-button';
import { AppRoute } from '../../constants';
import styles from './thanks-page.module.scss';

const ThanksPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<div className={styles.wrapper}>
					<svg
						className={styles.icon}
						viewBox="0 0 64 64"
						aria-hidden="true"
					>
						<use xlinkHref="#smile"></use>
					</svg>
					<Title
						titleText="Заказ принят"
						titleClass={`title title_fz30 title_fw800 ${styles.title}`}
						level="h1"
					/>
					<p className={styles.description}>
						{' '}
						Свяжемся в ближайшее время, уточним детали и согласуем
						доставку :)
					</p>
			<LinkButton
					className={`button button_primary ${styles.button}`}
					path={AppRoute.Root}
					label="Вернуться на главную страницу"
				>
					<span>Вернуться на главную</span>{' '}
				</LinkButton>
				</div>
			</div>
		</main>
	);
};

export default ThanksPage;
