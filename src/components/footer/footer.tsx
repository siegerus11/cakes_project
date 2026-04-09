import { Link } from 'react-router-dom';

import { Nav } from '../../types/types';
import { LAYOUT_NAVS } from '../../constants';
import SocialLinks from '../social-links/social-links';
import NavMenu from '../nav-menu/nav-menu';
import { getSecondaryNavs } from '../../utils/getSecondaryNavs';
import Button from '../ui/button/button';
import styles from './footer.module.scss';

type Props = {};

const Footer = (props: Props) => {
	return (
		<div className={styles.wrapper}>
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
					<NavMenu
						navs={getSecondaryNavs(LAYOUT_NAVS) as Nav[]}
						linkClassName={styles.link}
					/>
					<div className={styles.social}>
						<SocialLinks>
							<svg
								className={styles.social__icon}
								viewBox="0 0 40 40"
							>
								<use xlinkHref="#tg-bw"></use>
							</svg>
							<svg
								className={styles.social__icon}
								viewBox="0 0 40 40"
							>
								<use xlinkHref="#vk-bw"></use>
							</svg>
							<svg
								className={styles.social__icon}
								viewBox="0 0 40 40"
							>
								<use xlinkHref="#inst-bw"></use>
							</svg>
						</SocialLinks>
						<Button
							className={`button button_secondary ${styles.button}`}
							isLink
							url={'/'}
						>
							<span>Написать в Telegram</span>
							<svg
								className={styles.button__icon}
								viewBox="0 0 15 13"
							>
								<use xlinkHref="#tg-sm"></use>
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
