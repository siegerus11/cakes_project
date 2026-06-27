import { useCallback, memo } from 'react';

import { SORT_KINDS } from '../../../constants';
import { useAppSelector, useActionCreators } from '../../../hooks/useStore';
import {
	mainProcessSelectors,
	mainProcessActions
} from '../../../store/main-process/main-process';
import styles from './sort-list.module.scss';

type SortItemProps = {
	sortKind: (typeof SORT_KINDS)[number];
};
export const SortItem = memo(({ sortKind }: SortItemProps) => {
	const { getSortingStatus } = useActionCreators(mainProcessActions);
	const sortingStatus = useAppSelector(
		mainProcessSelectors.selectSortingStatus
	);
	const isActive = sortingStatus === sortKind;

	const handleSortClick = useCallback(() => {
		getSortingStatus(sortKind);
	}, [sortKind, getSortingStatus]);

	return (
		<li className={`${styles.item} ${isActive ? styles.item_active : ''}`}>
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
