import { AppRoute } from '../constants';
import { Nav } from '../types/types';

export function getLinkData(pathname: string, navs: Nav[]) {
	const resultLink = navs.filter((nav: Nav) => nav.path.includes(pathname));

	if (resultLink.length !== 0)
		return { title: resultLink[0].title, path: resultLink[0].path };
	else if (pathname.includes(AppRoute.BENTO_CAKES_CATALOG))
		return { title: 'Бенто-торты', path: AppRoute.BENTO_CAKES_CATALOG };
	else return { title: 'Торты', path: AppRoute.CAKES_CATALOG };
}
