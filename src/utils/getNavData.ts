import { Nav } from '../types/types';

const getNavData = (
	pathname: string,
	navs: Nav[]
): Omit<Nav, 'image'> | undefined => {
	// 1. Точное совпадение
	const exactMatch = navs.find(nav => nav.path === pathname);
	if (exactMatch) {
		return { title: exactMatch.title, path: exactMatch.path };
	}

	// 2. Поиск наиболее специфичного префикса (самый длинный путь, который является началом pathname)
	const prefixMatches = navs.filter(
		nav => pathname.startsWith(`${nav.path}/`) || pathname === nav.path
	);
	if (prefixMatches.length > 0) {
		// Выбираем самый длинный путь (наиболее специфичный)
		const bestMatch = prefixMatches.reduce((prev, current) =>
			current.path.length > prev.path.length ? current : prev
		);
		return { title: bestMatch.title, path: bestMatch.path };
	}

	// 3. Если ничего не найдено, возвращаем undefined
	return undefined;
};

export default getNavData;
