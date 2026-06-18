import { phone, OuterRoute } from '../../../constants';
import styles from './phone-segment.module.scss';

const PhoneSegment = () => {
	const formattedPhone = phone.replace(/[\s()-]/g, '');

	return (
		<div className={styles.wrapper}>
			<p className={styles.description}>Вопросы по заказам и доставке:</p>
			<a className={styles.phone} href={`tel:${formattedPhone}`}>
				{phone}
			</a>
			<a className={styles.link} href={OuterRoute.Telegram}>
				Написать в Telegram
			</a>
		</div>
	);
};

export default PhoneSegment;
