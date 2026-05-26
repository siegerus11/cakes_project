import { phone, OuterRoute } from '../../../constants';
import styles from './phone-segment.module.scss';

const PhoneSegment = () => {
	const formatedPhone = phone.replace(/[\s()-]/g, '');

	return (
		<div className={styles.wrapper}>
			<p className={styles.description}>Вопросы по заказам и доставке:</p>
			<a className={styles.phone} href={`tel:${formatedPhone}`}>
				{phone}
			</a>
			<a className={styles.outer} href={OuterRoute.Telegram}>
				Написать в Telegram
			</a>
		</div>
	);
};

export default PhoneSegment;
