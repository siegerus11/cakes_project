import { useCallback, useMemo } from 'react';

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
	const handleHamburgerClick = useCallback(
		() => onHamburgerClick(),
		[onHamburgerClick]
	);
	const handleNavLinkClick = useCallback(
		() => onHamburgerClick(),
		[onHamburgerClick]
	);

	const secondaryNavs = useMemo(
		() => getSecondaryNavs(LAYOUT_NAVS, true) as Nav[],
		[]
	);

	return (
		<div
			className={styles.wrapper}
			role="dialog"
			aria-modal="true"
			aria-label="Меню"
		>
			<div className="container">
				<div>
					<Hamburger
						onHamburgerClick={handleHamburgerClick}
						isPopup
					/>
					<NavMenu
						navs={secondaryNavs}
						onNavLinkClick={handleNavLinkClick}
						linkClassName={styles.link}
					/>
					<Button
						className={`button button_secondary ${styles.button}`}
						isOuterLink
						url={AppRoute.Root}
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
					<SocialLinks>
						<a className={styles.icon} href="/" aria-label="Telegram">
							<img
								src="../../../images/tg-colored.svg"
								alt=""
							/>
						</a>
						<a className={styles.icon} href="/" aria-label="ВКонтакте">
							<img
								src="../../../images/vk-colored.svg"
								alt=""
							/>
						</a>
						<a className={styles.icon} href="/" aria-label="Instagram">
							<img
								src="../../../images/inst-colored.svg"
								alt=""
							/>
						</a>
					</SocialLinks>
				</div>
			</div>
		</div>
	);
};

export default HamburgerPopup;
