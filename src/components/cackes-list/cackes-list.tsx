import Card from '../card/card';
import { AllCard } from '../card/card';
import { CakeOffer } from '../../types/types';
import { AppRoute } from '../../constants';
import styles from './cackes-list.module.scss';

type CackesListProps = {
	cakes: CakeOffer[];
	path: (typeof AppRoute)[keyof typeof AppRoute];
};

const CackesList = ({ cakes, path }: CackesListProps) => {
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
				<AllCard cake={cakes[0]} path={path} />
			</li>
		</ul>
	);
};

export default CackesList;
