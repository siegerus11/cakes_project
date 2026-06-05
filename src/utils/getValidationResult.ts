const nameValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите имя';
	if (!/^[a-zA-Zа-яА-Я\s]+$/.test(value))
		return 'Имя должно содержать только буквы';
	return true;
};

const phoneValidate = (value: string): boolean | string => {
	if (!value || !value.length) return 'Введите номер телефона';
	if (!/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value))
		return 'Номер телефона должен быть в формате +7(999)999-99-99';
	return true;
};

const addressValidate = (value: string): boolean | string => {
	if (!value || value.length < 5) return 'Введите адрес';
	return true;
};
const promoValidate = (value: string) => {};

export { nameValidate, phoneValidate, addressValidate, promoValidate };
