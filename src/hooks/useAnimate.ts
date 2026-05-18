import { useState } from 'react';

const useAnimate = () => {
	const [isElementVisible, setIsElementVisible] = useState(false);
	const [isAnimate, setIsAnimate] = useState(false);

	const handleOpen = () => {
		setIsElementVisible(true);
		setIsAnimate(false);
	};
	const handleClose = () => {
		setIsAnimate(true);
	};
	const handleAnimationEnd = () => {
		setIsElementVisible(false);
	};

	return {
		isElementVisible,
		isAnimate,
		handleOpen,
		handleClose,
		handleAnimationEnd
	};
};

export default useAnimate;
