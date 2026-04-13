import FillingPart from './filling-part/filling-part';
import WeightPart from './weight-part/weight-part';
import OptionalPart from './optional-part/optional-part';
import styles from './order-form.module.scss';
import { CakeOffer } from '../../../types/types';

type OrderFormProps = {
	cake: CakeOffer;
};

const OrderForm = ({ cake }: OrderFormProps) => {
	return (
		<div className={styles.component}>
			<form className={styles.feed}>
				<ol className={styles.list}>
					<FillingPart cake={cake} />
					<WeightPart cake={cake} />
					<OptionalPart cake={cake} />
				</ol>
			</form>
		</div>
	);
};

export default OrderForm;
