const nameValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите имя';
	if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value))
		return 'Имя должно содержать только буквы';
	const nonSpaceCount = value.replace(/\s/g, '').length;
	if (nonSpaceCount < 2)
		return 'Имя должно содержать минимум 2 символа';
	return true;
};

const phoneValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите номер телефона';

	const digits = value.replace(/\D/g, '');

	if (
		digits.length === 11 &&
		(digits.startsWith('7') || digits.startsWith('8'))
	)
		return true;
	return 'Номер телефона должен быть в формате +7 999 999 99 99';
};

const addressValidate = (value: string): boolean | string => {
	if (!value) return true;
	const nonSpace = value.replace(/\s/g, '').length;
	if (nonSpace < 6)
		return 'Адрес должен содержать минимум 6 символов';
	return true;
};

const commentValidate = (value: string): boolean | string => {
	if (value && value.length > 300)
		return 'Комментарий не должен превышать 300 символов';
	return true;
};

const promoValidate = (value: string): boolean | string => {
	if (!value || value.length < 6) return 'Введите минимум 6 символов';
	return true;
};

export {
	nameValidate,
	phoneValidate,
	addressValidate,
	commentValidate,
	promoValidate
};
