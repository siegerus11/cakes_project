import { useEffect, useCallback, useMemo } from 'react';

import { AppRoute, LAYOUT_NAVS } from '../../constants';
import useAnimate from '../../hooks/useAnimate';
import { useAppSelector } from '../../hooks/useStore';
import { cartProcessSelectors } from '../../store/cart-process/cart-process';
import getFormattedPrice from '../../utils/getFormattedPrice';
import HamburgerPopup from '../hamburger-popup/hamburger-popup';
import Logo from '../logo/logo';
import NavMenu from '../nav-menu/nav-menu';
import ShoppingCartItem from '../shopping-cart-item/shopping-cart-item';
import Button from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import SearchComponent from '../ui/search/search';
import styles from './header.module.scss';

const Header = () => {
	const {
		isVisible,
		animateIn,
		animateOut,
		handleAnimationEnd,
		getAnimationClass
	} = useAnimate();

	const handleHamburgerClick = () => {
		if (isVisible) animateOut();
		else animateIn();
	};

	const closePopup = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') animateOut();
		},
		[animateOut]
	);

	useEffect(() => {
		document.addEventListener('keydown', closePopup);
		return () => document.removeEventListener('keydown', closePopup);
	}, [closePopup]);

	const totalPrice = useAppSelector(cartProcessSelectors.selectFinalSum);
	const formattedPrice = useMemo(
		() => getFormattedPrice(totalPrice),
		[totalPrice]
	);

	return (
		<div className="container">
			<header className={styles.outer}>
				<div className={styles.wrapper}>
					<div className={styles.primary}>
						<Logo />
						<SearchComponent />
					</div>
					<div className={styles.secondary}>
						<ShoppingCartItem />
						<Button
							className={`button button_primary ${styles.button}`}
							path={AppRoute.ShoppingCart}
							label="Оформить заказ"
						>
							<svg
								className={styles.button__icon}
								viewBox="0 0 40 40"
								aria-hidden="true"
							>
								<use xlinkHref="#cart"></use>
							</svg>
							<span className={styles.button__text}>
								Оформить заказ
							</span>
							{totalPrice ? (
								<span className={styles.button__price}>
									{formattedPrice} ₽
								</span>
							) : null}
						</Button>
						<Hamburger onHamburgerClick={handleHamburgerClick} />
					</div>
				</div>
				<NavMenu navs={LAYOUT_NAVS} linkClassName={styles.link} />
			</header>
			{isVisible && (
				<HamburgerPopup
					onHamburgerClick={handleHamburgerClick}
					onAnimationEnd={handleAnimationEnd}
					getAnimationClass={getAnimationClass}
				/>
			)}
		</div>
	);
};

export default Header;
