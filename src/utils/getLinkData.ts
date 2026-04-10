import { Nav } from '../types/types';

export const getNavData = (pathname: string, navs: Nav[]) => {
	const resultLink = navs.filter((nav: Nav) => nav.path.includes(pathname));

	if (resultLink.length !== 0) {
		return { title: resultLink[0].title, path: resultLink[0].path };
	}
};
