import {
	PropsWithChildren,
	useEffect,
	useState,
	TouchEvent,
	MouseEvent
} from 'react';

type Coords = {
	x: number;
	y: number;
};

type DragAndDropProps = PropsWithChildren<{}>;

const DragAndDrop = ({ children }: DragAndDropProps) => {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [xTranslate, setXTranslate] = useState<number>(0);
	const [yTranslate, setYTranslate] = useState<number>(0);
	const [initialMousePosition, setInitialMousePosition] = useState<Coords>({
		x: 0,
		y: 0
	});
	const handleEventStart = (e: TouchEvent | MouseEvent) => {
		let InitialCoords = { clientX: 0, clientY: 0 };
		if (e instanceof TouchEvent) {
			InitialCoords = {
				clientX: e.touches[0].clientX,
				clientY: e.touches[0].clientY
			};
		} else if (e instanceof MouseEvent) {
			InitialCoords = {
				clientX: e.clientX,
				clientY: e.clientY
			};
		}

		setInitialMousePosition({
			x: InitialCoords.clientX,
			y: InitialCoords.clientY
		});
		setIsDragging(true);
	};
	useEffect(() => {
		const handleEventMove = (e: TouchEvent | MouseEvent) => {
			let coords = { clientX: 0, clientY: 0 };
			if (e instanceof TouchEvent) {
				coords = {
					clientX: e.touches[0].clientX,
					clientY: e.touches[0].clientY
				};
			} else if (e instanceof MouseEvent) {
				coords = {
					clientX: e.clientX,
					clientY: e.clientY
				};
			}

			setXTranslate(xTranslate + coords.clientX - initialMousePosition.x);
			setYTranslate(yTranslate + coords.clientY - initialMousePosition.y);
		};
		if (isDragging) {
			window.addEventListener('mousemove', handleEventMove);
			window.addEventListener('touchmove', handleEventMove);
		}
		return () => {
			window.removeEventListener('mousemove', handleEventMove);
			window.removeEventListener('touchmove', handleEventMove);
		};
	}, [isDragging, initialMousePosition]);
	useEffect(() => {
		const handleEventEnd = () => setIsDragging(false);
		window.addEventListener('mouseup', handleEventEnd);
		window.addEventListener('touchend', handleEventEnd);
		return () => {
			window.removeEventListener('mouseup', handleEventEnd);
			window.removeEventListener('touchend', handleEventEnd);
		};
	}, []);
	return (
		<div
			style={{ transform: `translate(${xTranslate}px,${yTranslate}px)` }}
			onMouseDown={handleEventStart}
			onTouchStart={handleEventStart}
		>
			{' '}
			{children}
		</div>
	);
};

export default DragAndDrop;
