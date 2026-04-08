import { useEffect, useState, MutableRefObject } from 'react';

export enum DraggingState {
	undefined = -1,
	starts = 0,
	moves = 1,
	finished = 2
}

export function useDragging(
	ref: MutableRefObject<HTMLDivElement | null>,
	elementHeight: number
) {
	// const ref = useRef() as RefObject<HTMLButtonElement>;
	const [state, setState] = useState(DraggingState.undefined);
	const [point, setPoint] = useState({ x: 0, y: 0 }); // point of cursor in relation to the element's parent точка курсора относительно родительского элемента
	const [elementOffset, setElementOffset] = useState({
		x: 0,
		y: ref.current?.offsetTop
	}); // offset of element in relation to it's parent смещение элемента по отношению к его родительскому элементу
	const [touchOffset, setTouchOffset] = useState({ x: 0, y: 0 }); // offset of mouse down point in relation to the element

	// shows active state of dragging
	const isDragging = () => {
		return state === DraggingState.starts || state === DraggingState.moves;
	};

	function onMouseDown(e: MouseEvent) {
		// e.preventDefault();
		// console.log('down');
		const parentElement = ref.current?.offsetParent as HTMLElement;
		if (/* e.button !== 0 ||  */ !ref.current || !parentElement) return;

		// First entry to the flow.
		// We save touchOffset value as parentElement's offset
		// to calculate element's offset on the move.
		setPoint({
			x: e.x - parentElement.offsetLeft,
			y: e.y - parentElement.offsetTop
		});
		setElementOffset({
			x: ref.current.offsetLeft,
			y: ref.current.offsetTop
		});
		setTouchOffset({
			x: e.x - parentElement.offsetLeft - ref.current.offsetLeft,
			y: e.y - parentElement.offsetTop - ref.current.offsetTop
		});

		setState(DraggingState.starts);
	}

	function onMouseMove(e: MouseEvent) {
		e.preventDefault();
		// console.log('move');
		const parentElement = ref.current?.offsetParent as HTMLElement;
		if (!isDragging() || !ref.current || !parentElement) return;
		setState(DraggingState.moves);

		setPoint({
			x: e.x - parentElement.offsetLeft,
			y: e.y - parentElement.offsetTop
		});

		setElementOffset({
			x: e.x - touchOffset.x - parentElement.offsetLeft,
			y: e.y - touchOffset.y - parentElement.offsetTop
		});

		console.log(elementHeight);
	}

	function onMouseUp(e: MouseEvent) {
		// console.log('up');
		// ends up the flow by setting the state
		setState(DraggingState.finished);
	}

	function onClick(e: MouseEvent) {
		// that's a fix for touch pads that transfer touches to click,
		// e.g "Tap to click" on macos. When enabled, on tap mouseDown is fired,
		// but mouseUp isn't. In this case we invoke mouseUp manually, to trigger
		// finishing state;
		setState(DraggingState.finished);
	}

	// When the element mounts, attach an mousedown listener
	useEffect(() => {
		const element = ref.current;
		element?.addEventListener('mousedown', onMouseDown);
		element?.addEventListener('touchstart', onMouseDown);

		return () => {
			element?.removeEventListener('mousedown', onMouseDown);
			element?.removeEventListener('touchstart', onMouseDown);
		};
	}, [ref.current]);

	// Everytime the state changes, assign or remove
	// the corresponding mousemove, mouseup and click handlers
	useEffect(() => {
		if (isDragging()) {
			document.addEventListener('mouseup', onMouseUp);
			document.addEventListener('touchend', onMouseUp);
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('touchmove', onMouseMove);
			document.addEventListener('click', onClick);
		} else {
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('click', onClick);
		}
		return () => {
			document.removeEventListener('mouseup', onMouseUp);
			document.removeEventListener('touchend', onMouseUp);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('touchmove', onMouseMove);
			document.removeEventListener('click', onClick);
		};
	}, [state]);

	return {
		state: state,
		point: point,
		elementOffset: elementOffset,
		touchOffset: touchOffset
	};
}

// import {
// 	useState,
// 	useEffect,
// 	MutableRefObject,
// 	MouseEvent,
// 	TouchEvent
// } from 'react';

// type DocumentEvtType = {
// 	removeEventListener(
// 		type: 'mousemove' | 'touchmove',
// 		listener: (event: MouseEvent | TouchEvent) => any,
// 		options?: boolean | EventListenerOptions
// 	): void;
// 	addEventListener(
// 		type: 'mousemove' | 'touchmove',
// 		listener: (event: MouseEvent | TouchEvent) => any,
// 		options?: boolean | EventListenerOptions
// 	): void;
// };

// type Coords = {
// 	y: number;
// };

// export const useDraggble = (
// 	ref: MutableRefObject<HTMLButtonElement | null>
// ): [(e: TouchEvent | MouseEvent) => void, number] => {
// 	const [isDragging, setIsDragging] = useState<boolean>(false);
// 	const [yPosition, setYPosition] = useState<number | undefined>(
// 		ref.current?.getBoundingClientRect().top
// 	);
// 	const [initialPosition, setInitialPosition] = useState<Coords>({
// 		y: 0
// 	});

// 	const handleEventStart = (e: TouchEvent | MouseEvent) => {
// 		let InitialCoords: Coords = { y: 0 };
// 		if ('touches' in e) {
// 			InitialCoords = {
// 				y: e.touches[0].clientY
// 			};
// 		} else {
// 			InitialCoords = {
// 				y: e.clientY
// 			};
// 		}

// 		setInitialPosition({
// 			y: InitialCoords.y
// 		});
// 		setIsDragging(true);
// 	};
// 	useEffect(() => {
// 		const handleEventMove = (e: TouchEvent | MouseEvent) => {
// 			let coords: Coords = { y: 0 };
// 			if ('touches' in e) {
// 				coords = {
// 					y: e.touches[0].clientY
// 				};
// 			} else {
// 				coords = {
// 					y: e.clientY
// 				};
// 			}

// 			let height = coords.y - initialPosition.y;
// 			if (ref.current?.getBoundingClientRect().top! < 0) {
// 				height = 0;
// 				setIsDragging(false);
// 			}

// 			if (
// 				ref.current?.getBoundingClientRect().top! >
// 				document.documentElement.clientHeight -
// 					ref.current?.offsetHeight!
// 			) {
// 				height =
// 					document.documentElement.clientHeight -
// 					ref.current?.offsetHeight!;
// 				setIsDragging(false);
// 			}

// 			setYPosition(height);
// 			console.log();
// 		};

// 		let documentElement: DocumentEvtType = document;
// 		if (isDragging) {
// 			documentElement.addEventListener('mousemove', handleEventMove);
// 			documentElement.addEventListener('touchmove', handleEventMove);
// 		}
// 		return () => {
// 			documentElement.removeEventListener('mousemove', handleEventMove);
// 			documentElement.removeEventListener('touchmove', handleEventMove);
// 		};
// 	}, [isDragging, initialPosition]);
// 	useEffect(() => {
// 		const handleEventEnd = () => setIsDragging(false);
// 		document.addEventListener('mouseup', handleEventEnd);
// 		document.addEventListener('touchend', handleEventEnd);
// 		return () => {
// 			document.removeEventListener('mouseup', handleEventEnd);
// 			document.removeEventListener('touchend', handleEventEnd);
// 		};
// 	}, []);

// 	return [handleEventStart, yPosition];
// };
