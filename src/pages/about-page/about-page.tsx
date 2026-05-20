import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import Title from '../../components/title/title';
import { IMPORTANCE } from '../../constants';
import styles from './about-page.module.scss';

type Props = {};

const AboutPage = (props: Props) => {
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
				</main>
			</div>
		</div>
	);
};

export default AboutPage;
