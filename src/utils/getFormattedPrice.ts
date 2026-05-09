const getFormattedPrice = (price: number): string => {
	return price.toLocaleString('ru-RU');
};

export default getFormattedPrice;