const getPricesSum = (array: number[], initialValue: number) => {
	return array.reduce((sum: number, item: number) => {
		const result = Math.floor(sum + item);
		return result;
	}, initialValue);
};

export default getPricesSum;
