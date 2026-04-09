import { useState } from 'react';
import styles from './clauses.module.scss';

type Props = {};

const Clauses = (props: Props) => {
	const [isVisibleArticle, setiIsVisibleArticle] = useState<boolean>(false);

	const handleButtonClick = () => {
		setiIsVisibleArticle(prevState => !prevState);
	};

	return (
		<div className={styles.outer}>
			<hr />
			<div
				className={
					isVisibleArticle
						? `${styles.main} ${styles.main_opened}`
						: `${styles.main}`
				}
			>
				Десерты на день рождения женщины <br /> День рождения – это
				праздник, наполненный счастьем, любовью и теплыми
				воспоминаниями. Представьте, какие чистые эмоции испытает
				именинница, когда вы подарите ей великолепный торт, созданный
				специально для нее. Это не просто десерт, это символ признания,
				заботы и внимания к деталям ее жизни. Это не просто десерт, это
				символ признания, заботы и внимания к деталям ее жизни. <br />
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
				tenetur, fugiat quibusdam dolorem est possimus asperiores libero
				tempore amet aliquam! Quos minus architecto officiis temporibus
				explicabo ut saepe harum iusto nesciunt nostrum, molestias sequi
				maxime atque quasi accusantium minima aliquam eveniet labore
				quas earum, iure rem. Corrupti cumque consectetur quaerat
				facilis reiciendis optio quae asperiores soluta, consequuntur
				doloribus alias quibusdam quam dignissimos architecto animi.
				Nam, dignissimos asperiores facilis, adipisci perspiciatis
				repellendus quaerat ad quis vel praesentium voluptas, blanditiis
				cumque fugit similique.
			</div>
			<button
				className={
					isVisibleArticle
						? `${styles.button} ${styles.button_opened}`
						: styles.button
				}
				onClick={handleButtonClick}
			>
				<span>{isVisibleArticle ? 'Скрыть' : 'Показать еще '}</span>
			</button>
		</div>
	);
};

export default Clauses;
