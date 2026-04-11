import { SORT_KINDS } from '../../../constants';
import styles from './sort-list.module.scss';

type SortItemProps = {
	sortKind: (typeof SORT_KINDS)[number];
};
export const SortItem = ({ sortKind }: SortItemProps) => {
	return (
		<li className={styles.item}>
			<button type="button">{sortKind}</button>
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
