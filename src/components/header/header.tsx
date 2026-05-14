import { useState, useEffect, useCallback, useMemo } from 'react';

import { AppRoute, LAYOUT_NAVS } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import { selectFinalSum } from '../../store/main-process/main-process';
import getFormattedPrice from '../../utils/getFormattedPrice';
import HamburgerPopup from '../hamburger-popup/hamburger-popup';
import Logo from '../logo/logo';
import NavMenu from '../nav-menu/nav-menu';
import ShoppingCartItem from '../shopping-cart-item/shopping-cart-item';
import Button from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import styles from './header.module.scss';

const Header = () => {
	const [hamburgerisVisible, setHamburgerisVisible] =
		useState<boolean>(false);

	const handleHamburgerClick = useCallback(() => {
		setHamburgerisVisible(prev => !prev);
	}, []);

	const closePopup = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') setHamburgerisVisible(false);
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', closePopup);
		return () => document.removeEventListener('keydown', closePopup);
	}, [closePopup]);

	const totalPrice = useAppSelector(selectFinalSum);
	const formattedPrice = useMemo(
		() => getFormattedPrice(totalPrice),
		[totalPrice]
	);

	return (
		<>
			<ShoppingCartItem />
			<div className="container">
				<header className={styles.outer}>
					<div className={styles.wrapper}>
						<div className={styles.primary}>
							<Logo />
							<div className={styles.search}>
								<svg
									className={styles.search__icon}
									viewBox="0 0 40 40"
								>
									<use xlinkHref="#search"></use>
								</svg>
								<input
									className={styles.search__input}
									type="search"
									placeholder="Поиск"
									aria-label="Поиск по товарам"
								/>
							</div>
						</div>
						<div className={styles.secondary}>
							<Button
								className={`button button_primary ${styles.button}`}
								path={AppRoute.ShoppingCart}
							>
								<svg
									className={styles.button__icon}
									viewBox="0 0 40 40"
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
							<Hamburger
								onHamburgerClick={handleHamburgerClick}
							/>
						</div>
					</div>
					<NavMenu navs={LAYOUT_NAVS} linkClassName={styles.link} />
				</header>
				{hamburgerisVisible && (
					<HamburgerPopup onHamburgerClick={handleHamburgerClick} />
				)}
			</div>
		</>
	);
};

export default Header;
