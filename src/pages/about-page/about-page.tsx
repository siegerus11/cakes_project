import DragAndDrop from '../../components/drag-n-drop/drag-n-drop';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<DragAndDrop>
			<div className={styles.box}>
				<button>Click to drag</button>
			</div>
		</DragAndDrop>
	);
};

export default AboutPage;
