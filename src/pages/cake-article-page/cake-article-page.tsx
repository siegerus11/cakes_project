import Button from '../../components/ui/button/button';
import Title from '../../components/title/title';
import styles from './cake-article-page.module.scss';

type Props = {};

const CakeArticlePage = (props: Props) => {
	const pageTitle = 'Торт с ягодами и безе';
	const titleClassName = 'title_fz30 title_fw800';

	return (
		<div className={`page ${styles.component}`}>
			<div className="container">
				<section className={styles.main}>
					<div className={styles.main__headline}>
						<Title
							titleText={pageTitle}
							titleClass={titleClassName}
						/>
						<div className={styles.adder}>
							<span className={styles.adder__price}>4 600 ₽</span>
							<Button
								className={`button button_primary ${styles.button}`}
							>
								<span>Добавить в корзину</span>
							</Button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default CakeArticlePage;
