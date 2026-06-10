import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Nav } from '../../types/types';
import scrollToHash from '../../utils/scrollToHash';
import styles from './nav-menu.module.scss';

type NavMenuProps = {
	navs: Nav[];
	onNavLinkClick?: () => void;
	linkClassName: string;
	isHeaderNav?: boolean;
};

const NavMenu = ({
	navs,
	onNavLinkClick,
	linkClassName,
	isHeaderNav = true
}: NavMenuProps) => {
	const navigate = useNavigate();

	const handleNavLinkClick = (
		e: MouseEvent<HTMLAnchorElement>,
		path: string
	) => {
		if (onNavLinkClick) onNavLinkClick();

		if (path.includes('#')) {
			e.preventDefault();
			const [route, hash] = path.split('#');
			navigate(route);
			scrollToHash(hash);
		}
	};

	return (
		<nav aria-label="Основное меню" className={styles.component}>
			<ul>
				{navs.map(nav => (
					<li key={nav.title}>
						<Link
							className={linkClassName}
							to={nav.path}
							onClick={e => handleNavLinkClick(e, nav.path)}
						>
							{isHeaderNav && (
								<>
									<div className={styles.background}></div>
									<div className={styles.overlay}></div>
								</>
							)}
							<span>{nav.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavMenu;
