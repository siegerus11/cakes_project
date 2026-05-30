import { address, pickupCoordinates } from '../../constants';
import useRoute from '../../hooks/useRoute';
import DescriptionSegment from '../description-segment/description-segment';
import Map from '../map/map';
import styles from './pick-up.module.scss';

type PickUpProps = {
	wrapperClass: string;
	headlineText: string;
	isDeliverPage?: boolean;
};

const PickUp = ({
	wrapperClass,
	headlineText,
	isDeliverPage = false
}: PickUpProps) => {
	const { handleBuildRoute, loading, error, route } =
		useRoute(pickupCoordinates);

	return (
		<div className={`${styles.wrapper} ${wrapperClass}`}>
			<DescriptionSegment
				titleText={headlineText}
				wrapperClass={`${styles.address} ${
					isDeliverPage
						? `${styles.address_revert} ${styles.address_mt45}`
						: ''
				}`}
			>
				{isDeliverPage && (
					<p className={styles.address__time}>
						Забрать заказ можно с 8:00 до 21:00, без выходных.{}
					</p>
				)}
				<address>{address}</address>
				<button
					className={styles.address__button}
					type="button"
					onClick={handleBuildRoute}
					aria-label="Построить маршрут"
					disabled={loading}
				>
					{loading ? 'Строим маршрут…' : 'Построить маршрут'}
				</button>
				{error && <p className={styles.address__error}>{error}</p>}
				<p className={styles.address__text}>
					Пожалуйста, оформите всё заранее — мы испечем ваш заказ и
					согласуем удобное время получения.
				</p>
			</DescriptionSegment>
			<Map route={route} isDeliverPage={isDeliverPage} />
		</div>
	);
};

export default PickUp;
