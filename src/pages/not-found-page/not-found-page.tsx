import { Link } from 'react-router-dom';

import Button from '../../components/ui/button/button';
import { AppRoute } from '../../constants';
import styles from './not-found-page.module.scss';

type NotFoundPageProps = {
	isRenderError?: boolean;
	errorMessage?: string;
	onHandleReset?: () => void;
};

const NotFoundPage = ({
	isRenderError = false,
	errorMessage,
	onHandleReset
}: NotFoundPageProps) => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<div className={styles.wrapper}>
					{isRenderError ? (
						<>
							<span className={styles.code}>Error</span>
							<h1 className={styles.title}>
								Что то пошло не так
							</h1>
							<p className={styles.description}>{errorMessage}</p>
							<Button
								className={`button button_primary ${styles.button}`}
								onClick={onHandleReset}
							>
								<span>Попробовать снова</span>
							</Button>
						</>
					) : (
						<>
							<span className={styles.code}>404</span>
							<h1 className={styles.title}>
								Страница не найдена
							</h1>
							<p className={styles.description}>
								Возможно, вы перешли по несуществующей ссылке
								или страница была удалена.
							</p>

							<Button
								className={`button button_primary ${styles.button}`}
								path={AppRoute.Root}
								label="Вернуться на главную страницу"
							>
								<span>На главную</span>
							</Button>
						</>
					)}
				</div>
			</div>
		</main>
	);
};

type ErrorFallbackComponentProps = {
	error: Error;
	resetErrorBoundary: () => void;
};

export const ErrorFallbackComponent = ({
	error,
	resetErrorBoundary
}: ErrorFallbackComponentProps) => (
	<NotFoundPage
		isRenderError
		errorMessage={error.message}
		onHandleReset={resetErrorBoundary}
	/>
);

export default NotFoundPage;
