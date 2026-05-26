import { useCallback, useMemo, AnimationEvent } from 'react';

import { LAYOUT_NAVS, OuterRoute } from '../../constants';
import { Nav } from '../../types/types';
import { getSecondaryNavs } from '../../utils/getSecondaryNavs';
import NavMenu from '../nav-menu/nav-menu';
import SocialLinks from '../social-links/social-links';
import Button from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import styles from './hamburger-popup.module.scss';

type HamburgerPopupProps = {
	onHamburgerClick: () => void;
	onAnimationEnd: () => void;
	getAnimationClass: (baseClass: string, activeClass: string) => string;
};

const HamburgerPopup = ({
	onHamburgerClick,
	onAnimationEnd,
	getAnimationClass
}: HamburgerPopupProps) => {
	const popUpClass = getAnimationClass(
		styles.wrapper,
		styles.wrapper_closing
	);

	const handleHamburgerClick = useCallback(
		() => onHamburgerClick(),
		[onHamburgerClick]
	);
	const handleNavLinkClick = useCallback(
		() => onHamburgerClick(),
		[onHamburgerClick]
	);
	const handleAnimationEnd = (e: AnimationEvent) => {
		if (e.animationName === styles.fadeOut) {
			onAnimationEnd();
		}
	};
	const secondaryNavs = useMemo(
		() => getSecondaryNavs(LAYOUT_NAVS, true) as Nav[],
		[]
	);

	return (
		<div
			className={popUpClass}
			onAnimationEnd={handleAnimationEnd}
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
					</Button>
					<SocialLinks>
						<a
							className={styles.icon}
							href={OuterRoute.Telegram}
							aria-label="Telegram"
						>
							<img
								src="../../../images/tg-colored.svg"
								alt="Telegram"
							/>
						</a>
						<a
							className={styles.icon}
							href={OuterRoute.Vk}
							aria-label="ВКонтакте"
						>
							<img
								src="../../../images/vk-colored.svg"
								alt="ВКонтакте"
							/>
						</a>
						<a
							className={styles.icon}
							href={OuterRoute.Instagram}
							aria-label="Instagram"
						>
							<img
								src="../../../images/inst-colored.svg"
								alt="Instagram"
							/>
						</a>
					</SocialLinks>
				</div>
			</div>
		</div>
	);
};

export default HamburgerPopup;
