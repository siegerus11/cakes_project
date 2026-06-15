import { useMemo } from 'react';

import { useAppSelector } from '../../hooks/useStore';
import { selectSortingStatus } from '../../store/main-process/main-process';
import { CakeOffer } from '../../types/types';
import getSortedByCategory from '../../utils/getSortedByCategory';
import Card, { AllCard } from '../card/card';
import styles from './cards-list.module.scss';

type CardsListProps = {
	cakes: CakeOffer[];
	isMainPage: boolean;
	path?: string;
};

const CardsList = ({ cakes, isMainPage, path }: CardsListProps) => {
	const sortingStatus = useAppSelector(selectSortingStatus);
	const sortedCakes = useMemo(
		() => getSortedByCategory(cakes, sortingStatus),
		[cakes, sortingStatus]
	);
	const relevantCakes = isMainPage ? cakes : sortedCakes;

	const listClass = isMainPage
		? styles.component
		: `${styles.component} ${styles.component_mt30} ${styles.component_fw} ${styles.component_rg} ${styles.component_jcSpaceBtw}`;

	return (
		<ul className={listClass}>
			{relevantCakes.map(cake => {
				return (
					<li key={cake.id} data-testid="card">
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
