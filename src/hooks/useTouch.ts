import { useState, TouchEvent } from 'react';

function useTouch(callback: () => void): {
	handleTouchStart: (e: TouchEvent) => void;
	handleTouchMove: (e: TouchEvent) => void;
	handleTouchEnd: () => void;
} {
	const [isTouchMove, setIsTouchMove] = useState<boolean>(false);

	const [touchStartY, setTouchStartY] = useState<number>(0);
	const [touchEndY, setTouchEndY] = useState<number>(0);

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStartY(e.touches[0].clientY);
	};

	const handleTouchMove = (e: TouchEvent) => {
		setIsTouchMove(true);
		setTouchEndY(e.touches[0].clientY);
	};

	const handleTouchEnd = () => {
		if (!isTouchMove) return;

		const touchDifference = touchEndY - touchStartY;
		const touchLength = Math.abs(touchEndY - touchStartY);
		const touchMinLength = 10;

		if (touchLength < touchMinLength) return;

		if (touchDifference > 0) callback();

		setIsTouchMove(false);
	};

	return {
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	};
}

export default useTouch;
