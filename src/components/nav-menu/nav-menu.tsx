import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Nav } from '../../types/types';

type NavMenuProps = {
	navs: Nav[];
	onNavLinkClick?: () => void;
	linkClassName: string;
};

const NavMenu = ({ navs, onNavLinkClick, linkClassName }: NavMenuProps) => {
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
			setTimeout(() => {
				const element = document.getElementById(hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
		}
	};

	return (
		<nav aria-label="Основное меню">
			<ul>
				{navs.map(nav => (
					<li key={nav.title}>
						<Link
							className={linkClassName}
							to={nav.path}
							onClick={e => handleNavLinkClick(e, nav.path)}
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
