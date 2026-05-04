import { PropsWithChildren } from 'react';

import styles from './overlay.module.scss';

type OverlayProps = PropsWithChildren;

const Overlay = ({ children }: OverlayProps) => {
	return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
