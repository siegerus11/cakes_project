import { useState, useEffect, KeyboardEvent } from 'react';

import { LAYOUT_NAVS } from '../../constants';
import HamburgerPopup from '../hamburger-popup/hamburger-popup';
import Logo from '../logo/logo';
import NavMenu from '../nav-menu/nav-menu';
import Button from '../ui/button/button';
import Hamburger from '../ui/hamburger/hamburger';
import styles from './header.module.scss';

type DocumentKeydownEvtType = {
	removeEventListener(
		type: 'keyup' | 'keydown',
		listener: (event: KeyboardEvent) => any,
		options?: boolean | EventListenerOptions
	): void;
	addEventListener(
		type: 'keyup' | 'keydown',
		listener: (event: KeyboardEvent) => any,
		options?: boolean | EventListenerOptions
	): void;
};

type Props = {};

const Header = (props: Props) => {
	const [hamburgerMenuState, setHamburgerMenuState] =
		useState<boolean>(false);

	const handleHamburgerClick = () => {
		setHamburgerMenuState(!hamburgerMenuState);
	};

	useEffect(() => {
		const documentElement: DocumentKeydownEvtType = document;
		const closePopup = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setHamburgerMenuState(false);
		};
		documentElement.addEventListener('keydown', closePopup);
		return () => documentElement.removeEventListener('keydown', closePopup);
	}, [hamburgerMenuState]);

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
						<Button
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
						</Button>
						<Hamburger onHamburgerClick={handleHamburgerClick} />
					</div>
				</div>
				<NavMenu navs={LAYOUT_NAVS} linkClassName={styles.link} />
			</header>
			{hamburgerMenuState && (
				<HamburgerPopup onHamburgerClick={handleHamburgerClick} />
			)}
		</div>
	);
};

export default Header;
