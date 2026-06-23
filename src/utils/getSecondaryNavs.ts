import { Nav } from '../types/types';

const getSecondaryNavs = (
	navs: Nav[],
	isHamburgerNav = false
): Nav[] => {
	const resultNavs = navs.map((nav): Nav => {
		if (nav.title === 'Частые вопросы' && isHamburgerNav) {
			return { ...nav, title: 'Популярные вопросы' };
		}
		if (nav.title === 'Каталог') {
			return { ...nav, title: 'Каталог десертов' };
		}
		return nav;
	});
	[resultNavs[0], resultNavs[1]] = [resultNavs[1], resultNavs[0]];
	return resultNavs;
};

export default getSecondaryNavs;
