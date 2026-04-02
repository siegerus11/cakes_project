import { Nav } from '../types/types';

function getSecondaryNavs(navs: Nav[], isHamburgerNav = false): unknown {
	const result = navs.map(nav => {
		if (nav.title === 'Частые вопросы' && isHamburgerNav) {
			return { ...nav, title: 'Популярные вопросы' };
		} else if (nav.title === 'Каталог')
			return { ...nav, title: 'Каталог десертов' };
		else return nav;
	});
	const temp = result[0];
	result[0] = result[1];
	result[1] = temp;
	return result;
}

export { getSecondaryNavs };
