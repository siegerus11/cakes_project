import { useState, useEffect } from 'react';

import { LAYOUT_NAVS } from '../../constants';
import HamburgerPopup from '../hamburger-popup/hamburger-popup';
import Logo from '../logo/logo';
import NavMenu from '../nav-menu/nav-menu';
import SubmitButton from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import styles from './header.module.scss';

const Header = () => {
	const [hamburgerisVisible, setHamburgerisVisible] =
		useState<boolean>(false);

	const handleHamburgerClick = () => {
		setHamburgerisVisible(!hamburgerisVisible);
	};

	useEffect(() => {
		const closePopup = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setHamburgerisVisible(false);
		};
		document.addEventListener('keydown', closePopup);
		return () => document.removeEventListener('keydown', closePopup);
	}, [hamburgerisVisible]);

	return (
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
							/>
						</div>
					</div>
					<div className={styles.secondary}>
						<SubmitButton
							className={`button button_primary ${styles.button}`}
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
							<span className={styles.button__price}>
								6 800 ₽
							</span>
						</SubmitButton>
						<Hamburger onHamburgerClick={handleHamburgerClick} />
					</div>
				</div>
				<NavMenu navs={LAYOUT_NAVS} linkClassName={styles.link} />
			</header>
			{hamburgerisVisible && (
				<HamburgerPopup onHamburgerClick={handleHamburgerClick} />
			)}
		</div>
	);
};

export default Header;
