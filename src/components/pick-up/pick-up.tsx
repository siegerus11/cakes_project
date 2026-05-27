import { address } from '../../constants';
import DescriptionSegment from '../description-segment/description-segment';
import Map from '../map/map';
import styles from './pick-up.module.scss';

type PickUpProps = {
	wrapperClass: string;
	headlineText: string;
	isDeliverPage: boolean;
};

const PickUp = ({ wrapperClass, headlineText, isDeliverPage }: PickUpProps) => {
	return (
		<div className={`${styles.wrapper} ${wrapperClass}`}>
			<DescriptionSegment
				titleText={headlineText}
				wrapperClass={styles.adress}
			>
				{isDeliverPage && (
					<p className={styles.adress__time}>
						Забрать заказ можно с 8:00 до 21:00, без выходных.{' '}
					</p>
				)}
				<address>{address}</address>
				<button className={styles.adress__link} type="button">
					Построить маршрут
				</button>
				<p className={styles.adress__text}>
					Пожалуйста, оформите всё заранее — мы испечем ваш заказ и
					согласуем удобное время получения.
				</p>
			</DescriptionSegment>
			<Map />
		</div>
	);
};

export default PickUp;
