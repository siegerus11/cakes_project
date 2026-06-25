import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/useStore';
	import {
		selectSortingStatus,
		selectSearchQuery
	} from '../../store/main-process/main-process';
	import { CakeOffer } from '../../types/types';
	import getByQuery from '../../utils/getQuery';
import getSortedByCategory from '../../utils/getSortedByCategory';
import Card, { AllCard } from '../card/card';
import styles from './cards-list.module.scss';

type CardsListProps = {
	cakes: CakeOffer[];
	randomImages?: string[] | undefined;
	isMainPage: boolean;
	path?: string;
};

const CardsList = ({
	cakes,
	randomImages,
	isMainPage,
	path
}: CardsListProps) => {
	const query = useAppSelector(selectSearchQuery);
	const sortingStatus = useAppSelector(selectSortingStatus);
	const sortedCakes = useMemo(
		() => getSortedByCategory(cakes, sortingStatus),
		[cakes, sortingStatus]
	);

	const queryMatchCakes = useMemo(
		() => getByQuery(sortedCakes, query),
		[sortedCakes, query]
	);
	const relevantCakes = isMainPage ? cakes : queryMatchCakes;

	const listClass = isMainPage
		? styles.component
		: `${styles.component} ${styles.component_mt30} ${styles.component_fw} ${styles.component_rg} ${styles.component_jcSpaceBtw}`;

	return (
		<ul className={listClass}>
			{relevantCakes?.map(cake => {
				return (
					<li key={cake.id} data-testid="card">
						<Card cake={cake} isMainPage={isMainPage} />
					</li>
				);
			})}
			{isMainPage && (
				<li className={styles.allItem}>
					<AllCard images={randomImages} path={path} />
				</li>
			)}
		</ul>
	);
};

export default CardsList;
