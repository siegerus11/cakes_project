import { useState } from 'react';

const useAnimate = () => {
	const [isAnimate, setIsAnimate] = useState(false);

	const handleOpen = () => {
		setIsAnimate(false);
	};
	const handleClose = () => {
		setIsAnimate(true);
	};
	const handleAnimationEnd = () => {
		setIsAnimate(false);
	};

	return {
		isAnimate,
		handleOpen,
		handleClose,
		handleAnimationEnd
	};
};

export default useAnimate;
