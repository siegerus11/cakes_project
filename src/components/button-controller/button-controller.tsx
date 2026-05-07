import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import styles from './button-controller.module.scss';

type ButtonControllerProps = PropsWithChildren<{
	outerClass: string;
}>;

const ButtonController = ({ children, outerClass }: ButtonControllerProps) => {
	const componentClass = `${styles.component} ${outerClass}`;

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
	}, []);

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
			<div className={componentClass} ref={elementRef}>
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
