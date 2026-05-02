import { useState, ChangeEvent } from 'react';

import { CheckBoxValue } from '../types/types';

function useCheckboxes<T>(
	initialCheckboxes: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] {
	const [checkboxes, setCheckboxes] = useState<T>(initialCheckboxes);

	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCheckboxes({
			...checkboxes,
			[e.target.id]: e.target.checked
		});
	};

	return [checkboxes, handleCheckboxChange];
}

export default useCheckboxes;
