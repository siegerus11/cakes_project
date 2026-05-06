import { useEffect, useState } from 'react';

function useConfirm(text: string) {
	const [assent, setAssent] = useState<boolean>(false);

	useEffect(() => {
		const answer = window.confirm(text);
		setAssent(answer);
	}, []);

	return assent;
}

export default useConfirm;
