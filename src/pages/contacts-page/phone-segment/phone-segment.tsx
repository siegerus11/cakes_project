import styles from 'react';

import { phone } from '../../../constants';

const PhoneSegment = () => {
	const formatedPhone = phone.replace(/\s+/g, '');

	console.log(formatedPhone);

	return (
		<>
			<p>Вопросы по заказам и доставке:</p>
			<a href={`tel:${formatedPhone}`}>{phone}</a>
			<a href="/">Написать в Telegram</a>
		</>
	);
};

export default PhoneSegment;
