import { render, screen, fireEvent } from '@testing-library/react';

import { AppRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import { Nav } from '../../types/types';
import NavMenu from './nav-menu';

jest.mock('../../utils/scrollToHash', () => ({
	__esModule: true,
	default: jest.fn()
}));

describe('Component: NavMenu', () => {
	const mockNavs: Nav[] = [
		{ title: 'О нас', image: '', path: '/about' },
		{ title: 'Каталог', image: '', path: '/catalog' },
		{ title: 'Контакты', image: '', path: '/contacts' }
	];

	const renderNavMenu = (
		onNavLinkClick?: () => void,
		isHeaderNav?: boolean,
		navs: Nav[] = mockNavs
	) => {
		const componentWithHistory = withHistory(
			<NavMenu
				navs={navs}
				onNavLinkClick={onNavLinkClick}
				linkClassName="test-link"
				isHeaderNav={isHeaderNav}
			/>
		);
		return render(componentWithHistory);
	};

	it('should render all nav items', () => {
		const expectedFirstNav = 'О нас';
		const expectedSecondNav = 'Каталог';
		const expectedThirdNav = 'Контакты';

		renderNavMenu();

		expect(screen.getByText(expectedFirstNav)).toBeInTheDocument();
		expect(screen.getByText(expectedSecondNav)).toBeInTheDocument();
		expect(screen.getByText(expectedThirdNav)).toBeInTheDocument();
	});

	it('should render nav element with aria-label', () => {
		const expectedAriaLabel = 'Основное меню';

		renderNavMenu();

		expect(screen.getByLabelText(expectedAriaLabel)).toBeInTheDocument();
	});

	it('should render links with correct href', () => {
		const expectedFirstHref = AppRoute.About;
		const expectedSecondHref = AppRoute.Catalog;
		const expectedThirdHref = AppRoute.Contacts;

		renderNavMenu();

		const links = screen.getAllByRole('link');
		expect(links[0].getAttribute('href')).toBe(expectedFirstHref);
		expect(links[1].getAttribute('href')).toBe(expectedSecondHref);
		expect(links[2].getAttribute('href')).toBe(expectedThirdHref);
	});

	it('should call onNavLinkClick when nav link is clicked', () => {
		const mockOnNavLinkClick = jest.fn();

		renderNavMenu(mockOnNavLinkClick, undefined, mockNavs);

		const firstLink = screen.getByText('О нас');
		fireEvent.click(firstLink);

		expect(mockOnNavLinkClick).toHaveBeenCalledTimes(1);
	});

	it('should render background and overlay when isHeaderNav is true', () => {
		const { container } = renderNavMenu(undefined, true, mockNavs);

		const listItems = container.querySelectorAll('li');
		listItems.forEach(li => {
			const divs = li.querySelectorAll('div');
			expect(divs.length).toBe(2);
		});
	});

	it('should not render background and overlay when isHeaderNav is false', () => {
		const { container } = renderNavMenu(undefined, false, mockNavs);

		const listItems = container.querySelectorAll('li');
		listItems.forEach(li => {
			const divs = li.querySelectorAll('div');
			expect(divs.length).toBe(0);
		});
	});

	it('should render empty list when navs array is empty', () => {
		renderNavMenu(undefined, undefined, []);

		const links = screen.queryAllByRole('link');
		expect(links.length).toBe(0);
	});
});
