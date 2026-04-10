import { Nav } from '../types/types';

export const getSecondaryNavs = (
	navs: Nav[],
	isHamburgerNav = false
): unknown => {
	const resultNavs = navs.map(nav => {
		if (nav.title === 'Частые вопросы' && isHamburgerNav) {
			return { ...nav, title: 'Популярные вопросы' };
		} else if (nav.title === 'Каталог')
			return { ...nav, title: 'Каталог десертов' };
		return nav;
	});
	const temp = resultNavs[0];
	resultNavs[0] = resultNavs[1];
	resultNavs[1] = temp;
	return resultNavs;
};
