export const getPersonQuantity = (weigh: number): string => {
	switch (weigh) {
		case 1.5:
			return '10-14';
		case 3:
			return '15-18';
		case 5:
			return '20-25';
		default:
			return '';
	}
};
