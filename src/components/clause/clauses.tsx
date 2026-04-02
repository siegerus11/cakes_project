import styles from './clauses.module.scss';

type Props = {};

const Clauses = (props: Props) => {
	return (
		<div className={styles.outer}>
			<hr />
			<div className={styles.main}>
				Десерты на день рождения женщины <br /> День рождения – это
				праздник, наполненный счастьем, любовью и теплыми
				воспоминаниями. Представьте, какие чистые эмоции испытает
				именинница, когда вы подарите ей великолепный торт, созданный
				специально для нее. Это не просто десерт, это символ признания,
				заботы и внимания к деталям ее жизни. Это не просто десерт, это
				символ признания, заботы и внимания к деталям ее жизни.
			</div>
			<button className={styles.button}>
				<span>Показать еще</span>
			</button>
		</div>
	);
};

export default Clauses;
