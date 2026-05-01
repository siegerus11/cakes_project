import { ReactWithChildren } from '../../types/types';
import styles from './overlay.module.scss';

const Overlay = ({ children }: ReactWithChildren) => {
	return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
