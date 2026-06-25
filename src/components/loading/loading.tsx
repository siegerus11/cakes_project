import styles from './loading.module.scss';

type LoadingProps = {
	message: string;
};

const Loader = ({ message }: LoadingProps) => {
	return (
		<div className="container">
			<div className={styles.loader}>{message}</div>
		</div>
	);
};

export default Loader;
