import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Questions from '../../components/questions/questions';
import Title from '../../components/title/title';
import styles from './about-page.module.scss';
import Importance from './importance/importance';

const AboutPage = () => {
	return (
		<div className="container">
			<div className={`page ${styles.page}`}>
				<BreadCrumbs />
				<Title titleText="О нас" titleClass={`${styles.title}`} />
				<hr />

				<main className={styles.main}>
					<Title
						titleText="Вкусно, красиво и 
						с любовью"
						level="h2"
						titleClass={`title_fw800 ${styles.main__title}`}
					/>

					<p className={styles.main__description}>
						ВауКейк — современная кондитерская в онлайн-формате. Мы
						не просто готовим десерты, а помогаем выразить чувства и
						сделать ваш праздник особенным.
					</p>
					<Importance />
					<Questions titleClass={styles.questions__title} />
				</main>
			</div>
		</div>
	);
};

export default AboutPage;
