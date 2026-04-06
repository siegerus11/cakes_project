import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import styles from './button-controller.module.scss';

type ButtonControllerProps = PropsWithChildren<{}>;

const ButtonController = ({ children }: ButtonControllerProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [offsetValue, setOffsetValue] = useState<number>(0);
	const [heightValue, setHeightValue] = useState<number>(0);
	const [isContentVisible, setIsContentVisible] = useState(false);
	const [isDraggin, setIsDraggin] = useState(false);
	const bottomFringe =
		document.documentElement.clientHeight - offsetValue - heightValue;

	useLayoutEffect(() => {
		setOffsetValue(elementRef.current?.offsetTop!);
		setHeightValue(elementRef.current?.offsetHeight!);
	});

	const handleBottomSheetTouchEnd = () => {
		if (isDraggin) return;
		setIsContentVisible(prevState => !prevState);
	};
	const handleBottomSheetTouchStart = () => {
		setIsDraggin(false);
	};

	return (
		<Draggable
			axis="y"
			defaultPosition={{ x: 0, y: offsetValue }}
			nodeRef={elementRef}
			handle=".handle"
			bounds={{
				top: -offsetValue,
				bottom: bottomFringe
			}}
			onDrag={() => setIsDraggin(true)}
		>
			<div className={styles.component} ref={elementRef}>
				<div className={styles.inner}>{children}</div>
				<div
					className={styles.content}
					style={{ height: `${isContentVisible ? 'unset' : 0}` }}
				>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Aut voluptate itaque error dignissimos nostrum
					exercitationem eligendi adipisci debitis pariatur qui
					aperiam in rem quia, reiciendis atque autem nesciunt Lorem,
					ipsum dolor sit amet consectetur adipisicing elit. Aut
					voluptate itaque error dignissimos nostrum exercitationem
					eligendi adipisci debitis pariatur qui aperiam in rem quia,
					reiciendis atque autem nesciunt
				</div>
				<button
					className={`${styles.item} handle`}
					type="button"
					onTouchStart={handleBottomSheetTouchStart}
					onTouchEnd={handleBottomSheetTouchEnd}
				></button>
			</div>
		</Draggable>
	);
};

export default ButtonController;

// const dragging = useDragging(elementRef, elementHeight);
// 	let newTop;

// 	if (dragging.elementOffset.y! < 0) newTop = 0;
// 	else if (
// 		dragging.elementOffset.y! >
// 		document.documentElement.clientHeight - elementHeight
// 	)
// 		newTop = window.scrollY + window.innerHeight - elementHeight;
// 	else newTop = dragging.elementOffset.y;

// 	useLayoutEffect(() => {
// 		setElementHeight(elementRef.current!.offsetHeight);
// 	}, []);

// const elementRef = useRef<HTMLDivElement | null>(null);
// 	const parent = elementRef.current?.parentElement;
// 	const [elementHeight, setElementHeight] = useState(0);

// 	const [initialY, setInitialY] = useState({ y: 0 });
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [position, setPosition] = useState(elementHeight);

// 	const onEventStart = (e: MouseEvent<HTMLDivElement>) => {
// 		setInitialY({ ...initialY, y: e.clientY });
// 		setIsDragging(true);
// 	};

// 	useLayoutEffect(
// 		() => {
// 			setElementHeight(parent?.offsetTop);

// 			// console.log(parent?.offsetTop);
// 			console.log(elementHeight);
// 			// console.log(parent?.offsetTop);
// 		},
// 		[
// 			/* isDragging, elementRef, position */
// 		]
// 	);

// 	useEffect(() => {
// 		if (!isDragging) return;
// 		const onEventMove = (e: MouseEvent<HTMLDivElement>) => {
// 			setPosition(position! + e.clientY - initialY.y);
// 			// console.log(position);
// 		};

// 		const onEventEnd = (e: MouseEvent<HTMLDivElement>) => {
// 			setIsDragging(false);
// 		};

// 		document.addEventListener('mousemove', onEventMove);
// 		document.addEventListener('mouseup', onEventEnd);
// 		return () => {
// 			document.removeEventListener('mousemove', onEventMove);
// 			document.removeEventListener('mouseup', onEventEnd);
// 		};
// 	}, [isDragging, elementRef]);
