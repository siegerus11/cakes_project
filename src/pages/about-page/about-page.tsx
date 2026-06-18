import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Questions from '../../components/questions/questions';
import Title from '../../components/title/title';
import { ABOUT_QUESTIONS } from '../../constants';
import styles from './about-page.module.scss';
import Importance from './importance/importance';
import Reviews from './reviews/reviews';

const AboutPage = () => {
	return (
		<div className={`page ${styles.page}`}>
			<div className="container">
				<BreadCrumbs />
				<Title titleText="О нас" titleClass={`${styles.title}`} hr />
			</div>
			<main className={styles.main}>
				<div className="container">
					<Title
						titleText="Вкусно, красиво и 
						с любовью"
						level="h2"
						titleClass={`title_fw800 ${styles.main__title}`}
					/>

					<p className={styles.main__description}>
						ВауКейк — современная кондитерская в онлайн-формате.
						<br className={styles.main__pass} />
						<br className={styles.main__pass} />
						Мы не просто готовим десерты, а помогаем выразить
						чувства и сделать ваш праздник особенным.
					</p>
				</div>
				<div className="container_secondary container">
					<Importance />
				</div>
				<div className="container">
					<Questions
						wrapperClass={styles.questions}
						titleClass={styles.questions__title}
						questions={ABOUT_QUESTIONS}
					/>
				</div>
			</main>
			<Reviews />
		</div>
	);
};

export default AboutPage;
