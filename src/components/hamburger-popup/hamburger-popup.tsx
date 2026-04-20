import { AppRoute, LAYOUT_NAVS } from '../../constants';
import { Nav } from '../../types/types';
import { getSecondaryNavs } from '../../utils/getSecondaryNavs';
import NavMenu from '../nav-menu/nav-menu';
import SocialLinks from '../social-links/social-links';
import Button from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import styles from './hamburger-popup.module.scss';

type HamburgerPopupProps = {
	onHamburgerClick: () => void;
};

const HamburgerPopup = ({ onHamburgerClick }: HamburgerPopupProps) => {
	const handleHamburgerClick = () => onHamburgerClick();
	const handleNavLinkClick = () => onHamburgerClick();

	return (
		<div className={styles.wrapper}>
			<div className="container">
				<div>
					<Hamburger
						onHamburgerClick={handleHamburgerClick}
						isPopup
					/>
					<NavMenu
						navs={getSecondaryNavs(LAYOUT_NAVS, true) as Nav[]}
						onNavLinkClick={handleNavLinkClick}
						linkClassName={styles.link}
					/>
					<Button
						className={`button button_secondary ${styles.button}`}
						isLink
						url={AppRoute.ROOT}
						type="button"
					>
						<span>Написать в Telegram</span>
						<svg
							className={styles.button__icon}
							viewBox="0 0 15 13"
						>
							<use xlinkHref="#tg-sm"></use>
						</svg>
					</Button>
					<SocialLinks>
						<a className={styles.icon} href="/">
							<img
								src="../../../images/tg-colored.svg"
								alt="tg-icon"
							/>
						</a>
						<a className={styles.icon} href="/">
							<img
								src="../../../images/vk-colored.svg"
								alt="vk-icon"
							/>
						</a>
						<a className={styles.icon} href="/">
							<img
								src="../../../images/inst-colored.svg"
								alt="inst-icon"
							/>
						</a>
					</SocialLinks>
				</div>
			</div>
		</div>
	);
};

export default HamburgerPopup;
