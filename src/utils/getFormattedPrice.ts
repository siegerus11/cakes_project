const getFormattedPrice = (price: number): string => {
	const str = price.toString();
	console.log(str.length);
	if (str.length === 5) return `${str[0]}${str[1]} ${str.slice(2)}`;
	if (str.length > 5) return `${str[0]}${str[1]}${str[2]} ${str.slice(3)}`;
	return `${str[0]} ${str.slice(1)}`;
};

export default getFormattedPrice;
