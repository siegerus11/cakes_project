import { useCallback, useMemo, AnimationEvent } from 'react';

import { LAYOUT_NAVS, OuterRoute } from '../../constants';
import getSecondaryNavs from '../../utils/getSecondaryNavs';
import NavMenu from '../nav-menu/nav-menu';
import SocialLinks from '../social-links/social-links';
import { OuterLinkButton } from '../ui/button/button';
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
		() => getSecondaryNavs(LAYOUT_NAVS, true),
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
						isHeaderNav={false}
					/>
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
					<SocialLinks>
						<a
							className={styles.icon}
							href={OuterRoute.Telegram}
							aria-label="Telegram"
						>
							<svg
								className={styles.icon__svg}
								viewBox="0 0 40 40"
								aria-hidden="true"
							>
								<use xlinkHref="#tg-colored"></use>
							</svg>
						</a>
						<a
							className={styles.icon}
							href={OuterRoute.Vk}
							aria-label="ВКонтакте"
						>
							<svg
								className={styles.icon__svg}
								viewBox="0 0 40 40"
								aria-hidden="true"
							>
								<use xlinkHref="#vk-colored"></use>
							</svg>
						</a>
						<a
							className={styles.icon}
							href={OuterRoute.Instagram}
							aria-label="Instagram"
						>
							<svg
								className={styles.icon__svg}
								viewBox="0 0 40 40"
								aria-hidden="true"
							>
								<use xlinkHref="#inst-colored"></use>
							</svg>
						</a>
					</SocialLinks>
				</div>
			</div>
		</div>
	);
};

export default HamburgerPopup;
