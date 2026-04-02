import styles from './logo.module.scss';

type Props = {};

const Logo = (props: Props) => {
	return (
		<a className={styles.link} href="/">
			ВРЕМЯ ВЕСЕЛЬЯ
		</a>
	);
};

export default Logo;
