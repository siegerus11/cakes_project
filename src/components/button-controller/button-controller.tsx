import { PropsWithChildren } from 'react';
import styles from './button-controller.module.scss';

type ButtonControllerProps = PropsWithChildren<{}>;

const ButtonController = ({ children }: ButtonControllerProps) => {
	return (
		<div className={styles.component}>
			<div className={styles.inner}>{children}</div>
			<div className={styles.item}></div>
		</div>
	);
};

export default ButtonController;
