import { useRef, useLayoutEffect, useState, SetStateAction } from 'react';
import { useDragging } from '../../hooks/useDraggble';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
	const elemRef = useRef(null);
	const [elementHeight, setElementHeight] = useState(0);
	const dragging = useDragging(elemRef);
	let newTop;

	if (dragging.elementOffset.y! < 0) newTop = 0;
	else if (
		dragging.elementOffset.y! >
		document.documentElement.clientHeight - elementHeight
	)
		newTop = document.documentElement.clientHeight - elementHeight;
	else newTop = dragging.elementOffset.y;

	useLayoutEffect(() => {
		setElementHeight(elemRef.current!.offsetHeight);
	}, []);

	return (
		<div className={styles.box}>
			<button
				className={styles.button}
				ref={elemRef}
				style={{ top: `${newTop}px` }}
			>
				Click to drag
			</button>
		</div>
	);
};

export default AboutPage;
