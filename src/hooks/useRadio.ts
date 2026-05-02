import { ChangeEvent, useState } from 'react';

import { Radio } from '../types/types';

function useRadio(
	initialRadios: Radio[]
): [Radio[], (e: ChangeEvent<HTMLInputElement>, idx: number) => void] {
	const [radios, setRadios] = useState(initialRadios);

	const handleRadioChange = (
		e: ChangeEvent<HTMLInputElement>,
		idx: number
	) => {
		setRadios(
			radios.map((radio, i) => {
				return i === idx
					? {
							...radio,
							isChecked: true,
							value: parseFloat(e.target.value)
					  }
					: {
							...radio,
							isChecked: false,
							value: radio.weightValue
					  };
			})
		);
	};

	return [radios, handleRadioChange];
}

export default useRadio;
