import { useMemo } from 'react';

import { LAYOUT_NAVS } from '../../constants';
import { Nav } from '../../types/types';
import { getSecondaryNavs } from '../../utils/getSecondaryNavs';
import NavMenu from '../nav-menu/nav-menu';
import SocialLinks from '../social-links/social-links';
import Button from '../ui/button/button';
import styles from './footer.module.scss';

const Footer = () => {
	const secondaryNavs = useMemo(
		() => getSecondaryNavs(LAYOUT_NAVS) as Nav[],
		[]
	);

	return (
		<footer className={styles.wrapper}>
			<div className="container_footer container">
				<div>
					<ul className={styles.side}>
						<li className={styles.agreementLink}>
							© 2025 ООО «ВауКейк»
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
					<NavMenu navs={secondaryNavs} linkClassName={styles.link} />
					<div className={styles.social}>
						<SocialLinks>
							<a className={styles.social__link} href="/" aria-label="Telegram">
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#tg-bw"></use>
								</svg>
							</a>
							<a className={styles.social__link} href="/" aria-label="ВКонтакте">
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#vk-bw"></use>
								</svg>
							</a>
							<a className={styles.social__link} href="/" aria-label="Instagram">
								<svg
									className={styles.social__icon}
									viewBox="0 0 40 40"
									aria-hidden="true"
								>
									<use xlinkHref="#inst-bw"></use>
								</svg>
							</a>
						</SocialLinks>
					<Button
						className={`button button_secondary ${styles.button}`}
						isOuterLink
						url="/"
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
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
