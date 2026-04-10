import Card from '../card/card';
import { AllCard } from '../card/card';
import { CakeOffer, RoutePath } from '../../types/types';
import styles from './cards-list.module.scss';

type CardsListProps = {
	cakes: CakeOffer[];
	isMainPage: boolean;
	path?: RoutePath;
};

const CardsList = ({ cakes, isMainPage, path }: CardsListProps) => {
	const listClass = isMainPage
		? styles.component
		: `${styles.component} ${styles.component_mt30} ${styles.component_fw} ${styles.component_rg} ${styles.component_jcSpanceBtw}`;
	return (
		<ul onClick={() => console.log('!')} className={listClass}>
			{cakes.map(cake => {
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
