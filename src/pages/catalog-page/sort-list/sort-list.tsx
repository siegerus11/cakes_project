import { useCallback, memo } from 'react';

import { SORT_KINDS } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useStore';
import { getSortingStatus } from '../../../store/main-process/main-process';
import styles from './sort-list.module.scss';

type SortItemProps = {
	sortKind: (typeof SORT_KINDS)[number];
};
export const SortItem = memo(({ sortKind }: SortItemProps) => {
	const dispatch = useAppDispatch();

	const handleSortClick = useCallback(() => {
		dispatch(getSortingStatus(sortKind));
	}, [dispatch, sortKind]);

	return (
		<li className={styles.item}>
			<button onClick={handleSortClick} type="button">
				{sortKind}
			</button>
		</li>
	);
});

SortItem.displayName = 'SortItem';

const SortList = () => {
	return (
		<ul className={styles.component}>
			{SORT_KINDS.map(kind => (
				<SortItem sortKind={kind} key={kind} />
			))}
		</ul>
	);
};

export default SortList;
