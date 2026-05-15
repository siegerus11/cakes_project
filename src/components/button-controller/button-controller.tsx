import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

import styles from './button-controller.module.scss';

type ButtonControllerProps = PropsWithChildren<{
	outerClass: string;
}>;

const ButtonController = ({ children, outerClass }: ButtonControllerProps) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [bounds, setBounds] = useState<{ top: number; bottom: number }>({
		top: 0,
		bottom: 0
	});

	useLayoutEffect(() => {
		if (elementRef.current) {
			const offset = elementRef.current.offsetTop;
			const height = elementRef.current.offsetHeight;
			const { clientHeight } = document.documentElement;
			setBounds({
				top: -offset,
				bottom: clientHeight - offset - height
			});
		}
	}, []);

	return (
		<Draggable
			axis="y"
			defaultPosition={{ x: 0, y: bounds.top }}
			nodeRef={elementRef}
			handle=".handle"
			bounds={bounds}
		>
			<div
				className={`${styles.component} ${outerClass}`}
				ref={elementRef}
			>
				<div className={styles.inner}>{children}</div>
				<button className={`${styles.item} handle`} type="button" aria-label="Переместить заказ" />
			</div>
		</Draggable>
	);
};

export default ButtonController;
