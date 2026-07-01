import { useMemo } from 'react';

import { LAYOUT_NAVS, OuterRoute } from '../../constants';
import getSecondaryNavs from '../../utils/getSecondaryNavs';
import NavMenu from '../nav-menu/nav-menu';
import SocialLinks from '../social-links/social-links';
import { OuterLinkButton } from '../ui/button/button';
import styles from './footer.module.scss';

const Footer = () => {
	const secondaryNavs = useMemo(() => getSecondaryNavs(LAYOUT_NAVS), []);

	return (
		<footer className={styles.wrapper}>
			<div className="container_footer container">
				<div>
					<ul className={styles.side}>
						<li className={styles.agreementLink}>
							© 2026 ООО «ВауКейк»
						</li>
						<li>
							<a className={styles.agreementLink} href="/">
								Политика обработки ПД
							</a>
						</li>
						<li>
							<a className={styles.agreementLink} href="/">
								Пользовательское соглашение
							</a>
						</li>
						<li></li>
					</ul>
					<NavMenu
						navs={secondaryNavs}
						linkClassName={styles.link}
						isHeaderNav={false}
					/>
					<div className={styles.social}>
						<SocialLinks>
							<a
								className={styles.social__link}
								href={OuterRoute.Telegram}
								aria-label="Telegram"
							>
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#tg-bw"></use>
								</svg>
							</a>
							<a
								className={styles.social__link}
								href={OuterRoute.Vk}
								aria-label="ВКонтакте"
							>
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#vk-bw"></use>
								</svg>
							</a>
							<a
								className={styles.social__link}
								href={OuterRoute.Instagram}
								aria-label="Instagram"
							>
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#inst-bw"></use>
								</svg>
							</a>
						</SocialLinks>
						<OuterLinkButton
							className={`button button_secondary ${styles.button}`}
							url={OuterRoute.Telegram}
							label="Написать в Telegram"
						>
							<span>Написать в Telegram</span>
							<svg
								className={styles.button__icon}
								viewBox="0 0 15 13"
								aria-hidden="true"
							>
								<use xlinkHref="#tg-sm"></use>
							</svg>
						</OuterLinkButton>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
