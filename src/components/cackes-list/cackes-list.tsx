import Card from '../card/card';
import { AllCard } from '../card/card';
import { CakeOffer } from '../../types/types';
import styles from './cackes-list.module.scss';

type CackesListProps = {
	cakes: CakeOffer[];
};

const CackesList = ({ cakes }: CackesListProps) => {
	return (
		<ul className={styles.list}>
			{cakes.map(cake => {
				return (
					<li key={cake.id}>
						<Card cake={cake} />
					</li>
				);
			})}
			<li>
				<AllCard cake={cakes[0]} />
			</li>
		</ul>
	);
};

export default CackesList;
