import styles from './no-found-cake.module.scss';

const NotFoundCake = () => {
	return (
		<div className={styles.component}>
			<h2 className={styles.title}>Не нашли свой торт?</h2>
			<p className={styles.describe}>
				Расскажите, каким вы видите идеальное украшение вашего
				праздника, и мы воплотим его в жизнь &#x1F970;
			</p>
			<a className={styles.link} href="/">
				Напишите в Telegram
			</a>
		</div>
	);
};

export default NotFoundCake;
