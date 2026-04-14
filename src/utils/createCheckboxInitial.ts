export const createCheckboxInitial = array => {
	array.map(item => {
		return {
			isChecked: false,
			title: item
		};
	});
};
