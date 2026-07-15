const nameValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите имя';
	if (value && value.length > 100) return 'Слишком много символов';

	if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value))
		return 'Имя должно содержать только буквы';
	const nonSpaceCount = value.replace(/\s/g, '').length;
	if (nonSpaceCount < 2) return 'Имя должно содержать минимум 2 символа';
	return true;
};

const phoneValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите номер телефона';

	const digits = value.replace(/\D/g, '');

	if (!digits) return 'Номер телефона должен содержать цифры';

	if (digits.length < 11)
		return 'Номер телефона должен содержать минимум 10 цифр';
	if (digits.length > 15) return 'Слишком много символов';

	if (!digits) return 'Номер телефона должен содержать цифры';

	if (digits.length < 11)
		return 'Номер телефона должен содержать минимум 10 цифр';
	if (digits.length > 15) return 'Слишком много символов';

	// Номер должен начинаться с +7 или 8 (в исходном виде) или с 7 или 8 (в виде цифр)
	if (
		!value.startsWith('+7') &&
		!value.startsWith('8') &&
		!digits.startsWith('7') &&
		!digits.startsWith('8')
	) {
		return 'Неправильный формат номера телефона';
	}

	return true;
};

const addressValidate = (value: string): boolean | string => {
	if (!value) return true;

	if (value && value.length > 100) return 'Слишком много символов';

	const nonSpace = value.replace(/\s/g, '').length;
	if (nonSpace < 6) return 'Адрес должен содержать минимум 6 символов';
	return true;
};

const commentValidate = (value: string): boolean | string => {
	if (value && value.length > 300)
		return 'Комментарий не должен превышать 300 символов';
	return true;
};

const promoValidate = (value: string): boolean | string => {
	if (!value || value.length < 6) return 'Введите минимум 6 символов';
	if (value && value.length > 30) return 'Слишком много символов';
	return true;
};

export {
	nameValidate,
	phoneValidate,
	addressValidate,
	commentValidate,
	promoValidate
};
