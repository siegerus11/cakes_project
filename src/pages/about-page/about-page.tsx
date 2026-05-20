import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Title from '../../components/title/title';
import styles from './about-page.module.scss';
import Importance from './importance/importance';

const AboutPage = () => {
	return (
		<div className="container">
			<div className={`page ${styles.page}`}>
				<BreadCrumbs />
				<Title titleText="О нас" titleClass={`title ${styles.title}`} />
				<hr />

				<main className={styles.main}>
					<Title
						titleText="Вкусно, красиво и 
						с любовью"
						level="h2"
						titleClass={`title title_fw800 ${styles.main__title}`}
					/>

					<p className={styles.main__description}>
						ВауКейк — современная кондитерская в онлайн-формате. Мы
						не просто готовим десерты, а помогаем выразить чувства и
						сделать ваш праздник особенным.
					</p>
					<Importance />
				</main>
			</div>
		</div>
	);
};

export default AboutPage;
