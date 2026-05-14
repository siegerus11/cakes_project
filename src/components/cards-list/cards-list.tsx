import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/useStore';
import { selelectSortingStatus } from '../../store/main-process/main-process';
import { CakeOffer, RoutePath } from '../../types/types';
import getSortedByCategory from '../../utils/getSortedByCategory';
import Card, { AllCard } from '../card/card';
import styles from './cards-list.module.scss';

type CardsListProps = {
	cakes: CakeOffer[];
	isMainPage: boolean;
	path?: RoutePath;
};

const CardsList = ({ cakes, isMainPage, path }: CardsListProps) => {
	const sortingStatus = useAppSelector(selelectSortingStatus);
	const sortedCakes = useMemo(
		() => getSortedByCategory(cakes, sortingStatus),
		[cakes, sortingStatus]
	);
	const relevantCakes = useMemo(
		() => (isMainPage ? cakes : sortedCakes),
		[isMainPage, cakes, sortedCakes]
	);

	const listClass = isMainPage
		? styles.component
		: `${styles.component} ${styles.component_mt30} ${styles.component_fw} ${styles.component_rg} ${styles.component_jcSpanceBtw}`;

	return (
		<ul className={listClass}>
			{relevantCakes.map(cake => {
				return (
					<li key={cake.id}>
						<Card cake={cake} isMainPage={isMainPage} />
					</li>
				);
			})}
			{isMainPage && (
				<li>
					<AllCard cake={cakes[0]} path={path} />
				</li>
			)}
		</ul>
	);
};

export default CardsList;
