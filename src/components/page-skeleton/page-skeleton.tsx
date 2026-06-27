import Loader from '../loader/loader';
import styles from './page-skeleton.module.scss';

type PageSkeletonProps = {
	message: string;
};

const PageSkeleton = ({ message }: PageSkeletonProps) => {
	return (
		<div className={styles.skeleton}>
			<Loader message={message} />
		</div>
	);
};

export default PageSkeleton;
