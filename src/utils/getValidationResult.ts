const nameValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите имя';
	if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value))
		return 'Имя должно содержать только буквы';
	return true;
};

const phoneValidate = (value: string): boolean | string => {
	if (!value || !value.length) {
		return 'Введите номер телефона';
	}

	const digits = value.replace(/\D/g, '');

	if (
		digits.length === 11 &&
		(digits.startsWith('7') || digits.startsWith('8'))
	) {
		return true;
	}

	return 'Номер телефона должен быть в формате +7 999 999 99 99';
};

const addressValidate = (value: string): boolean | string => {
	if (!value || value.length < 5) return 'Введите адрес';
	return true;
};
const promoValidate = (value: string) => {};

export { nameValidate, phoneValidate, addressValidate, promoValidate };
