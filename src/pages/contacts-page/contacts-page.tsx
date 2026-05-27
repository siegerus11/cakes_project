import BreadCrumbs from '../../components/bread-crumbs/bread-crumbs';
import DescriptionSegment from '../../components/description-segment/description-segment';
import PickUp from '../../components/pick-up/pick-up';
import SocialLinks from '../../components/social-links/social-links';
import Title from '../../components/title/title';
import { OuterRoute, appeals } from '../../constants';
import styles from './contacts-page.module.scss';
import PhoneSegment from './phone-segment/phone-segment';

const ContactsPage = () => {
	return (
		<main className={`page ${styles.page}`}>
			<div className="container">
				<BreadCrumbs />
				<Title titleClass={styles.title} titleText="Контакты" hr />
				<PhoneSegment />
				<DescriptionSegment
					wrapperClass={styles.hours}
					titleClass={styles.hours__title}
					titleText="Часы работы"
					titleLevel="h2"
				>
					<p className={styles.hours__description}>
						Работаем каждый день с 8:00 до 21:00
					</p>
				</DescriptionSegment>
				<PickUp
					wrapperClass={styles.pickup}
					headlineText="Адрес самовывоза"
					isDeliverPage={false}
				/>
				<DescriptionSegment
					titleText="Связь с директором"
					wrapperClass={styles.communication}
					titleLevel="h2"
				>
					<ul className={styles.communication__list}>
						{appeals.map((appeal, index) => {
							const keyValue = `${appeal}-${index}`;
							return (
								<li
									key={keyValue}
									className={styles.communication__item}
								>
									{appeal}
								</li>
							);
						})}
					</ul>
					<p className={styles.communication__description}>
						Напишите в Telegram:{' '}
						<a href={OuterRoute.Telegram}>@mskkond</a>
					</p>
				</DescriptionSegment>
				<DescriptionSegment
					titleText="Мы в соцсетях"
					titleLevel="h2"
					wrapperClass={styles.social}
				>
					<SocialLinks>
						<a href="/" className={styles.social__link}>
							<svg
								viewBox="0 0 40 40"
								className={styles.social__icon}
							>
								<use xlinkHref="#vk-colored"></use>
							</svg>
						</a>
						<a href="/" className={styles.social__link}>
							<svg
								viewBox="0 0 40 40"
								className={styles.social__icon}
							>
								<use xlinkHref="#inst-colored"></use>
							</svg>
						</a>
						<a href="/" className={styles.social__link}>
							<svg
								viewBox="0 0 40 40"
								className={styles.social__icon}
							>
								<use xlinkHref="#tg-colored"></use>
							</svg>
						</a>
					</SocialLinks>
				</DescriptionSegment>
			</div>
		</main>
	);
};

export default ContactsPage;
