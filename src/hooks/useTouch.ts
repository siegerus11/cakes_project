import { useState, TouchEvent, useCallback } from 'react';

function useTouch(callback: () => void): {
	handleTouchStart: (e: TouchEvent) => void;
	handleTouchMove: (e: TouchEvent) => void;
	handleTouchEnd: () => void;
} {
	const [isTouchMove, setIsTouchMove] = useState<boolean>(false);

	const [touchStartY, setTouchStartY] = useState<number>(0);
	const [touchEndY, setTouchEndY] = useState<number>(0);

	const handleTouchStart = useCallback((e: TouchEvent) => {
		if (e.touches && e.touches.length > 0) {
			setTouchStartY(e.touches[0].clientY);
		}
	}, []);

	const handleTouchMove = useCallback((e: TouchEvent) => {
		setIsTouchMove(true);
		if (e.touches && e.touches.length > 0) {
			setTouchEndY(e.touches[0].clientY);
		}
	}, []);

	const handleTouchEnd = useCallback(() => {
		if (!isTouchMove) return;

		const touchDifference = touchEndY - touchStartY;
		const touchLength = Math.abs(touchEndY - touchStartY);
		const touchMinLength = 10;

		if (touchLength < touchMinLength) return;

		if (touchDifference > 0) callback();

		setIsTouchMove(false);
	}, [isTouchMove, touchEndY, touchStartY, callback]);

	return {
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd
	};
}

export default useTouch;
