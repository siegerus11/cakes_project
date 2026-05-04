import { SORT_KINDS } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useStore';
import { getSortingStatus } from '../../../store/main-process/main-process';
import styles from './sort-list.module.scss';

type SortItemProps = {
	sortKind: (typeof SORT_KINDS)[number];
};
export const SortItem = ({ sortKind }: SortItemProps) => {
	const dispatch = useAppDispatch();

	const handleSortClick = () => {
		dispatch(getSortingStatus(sortKind));
	};
	return (
		<li className={styles.item}>
			<button onClick={handleSortClick} type="button">
				{sortKind}
			</button>
		</li>
	);
};

const SortList = () => {
	return (
		<ul className={styles.component}>
			{SORT_KINDS.map(kind => {
				return <SortItem sortKind={kind} key={kind} />;
			})}
		</ul>
	);
};

export default SortList;
