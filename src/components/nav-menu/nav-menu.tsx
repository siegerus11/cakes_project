import { Link } from 'react-router-dom';

import { Nav } from '../../types/types';
import styles from './nav-menu.module.scss';

type NavMenuProps = {
	navs: Nav[];
	onNavLinkClick?: () => void;
	linkClassName: string;
};

const NavMenu = ({ navs, onNavLinkClick, linkClassName }: NavMenuProps) => {
	const handleNavLinkClick = () => {
		if (onNavLinkClick) onNavLinkClick();
	};
	return (
		<nav>
			<ul>
				{navs.map(nav => (
					<li key={nav.title}>
						<Link
							className={linkClassName}
							to={nav.path}
							onClick={handleNavLinkClick}
						>
							<span>{nav.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavMenu;
