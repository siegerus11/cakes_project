export const getPricesSum = (array: number[], initialValue: number) => {
	return array.reduce((sum: number, item: number) => {
		return (sum += item);
	}, initialValue);
};
