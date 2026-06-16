import { render, screen } from '@testing-library/react';

import { LoadingStatus, NameSpace } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import CatalogPage from './catalog-page';

jest.mock('../../components/bread-crumbs/bread-crumbs', () => {
	const MockBreadCrumbs = () => (
		<nav data-testid="breadcrumbs" aria-label="Хлебные крошки" />
	);
	return { __esModule: true, default: MockBreadCrumbs };
});

jest.mock('../../components/cards-list/cards-list', () => {
	const MockCardsList = () => <div data-testid="cards-list" />;
	return { __esModule: true, default: MockCardsList };
});

jest.mock('../../components/clause/clause', () => {
	const MockClauses = () => <div data-testid="clauses" />;
	return { __esModule: true, default: MockClauses };
});

jest.mock('../../components/title/title', () => {
	const MockTitle = ({ titleText }: { titleText: string }) => (
		<h1 data-testid="title">{titleText}</h1>
	);
	return { __esModule: true, default: MockTitle };
});

jest.mock('./sort-list/sort-list', () => {
	const MockSortList = () => <div data-testid="sort-list" />;
	return { __esModule: true, default: MockSortList };
});

jest.mock('./no-found-cake/no-found-cake', () => {
	const MockNotFoundCake = () => <div data-testid="not-found-cake" />;
	return { __esModule: true, default: MockNotFoundCake };
});

describe('Component: CatalogPage', () => {
	const fakeCake = makeFakeCakeOffer();

	const renderCatalogPage = () => {
		const component = withHistory(<CatalogPage cakes={[fakeCake]} />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Data]: {
				cakeOffers: [fakeCake],
				offersLoadingStatus: LoadingStatus.Success,
				orderSendingStatus: LoadingStatus.Idle
			}
		});
		return render(withStoreComponent);
	};

	it('should render page title', () => {
		const titleTestId = 'title';

		renderCatalogPage();

		expect(screen.getByTestId(titleTestId)).toBeInTheDocument();
	});

	it('should render breadcrumbs', () => {
		const breadcrumbsTestId = 'breadcrumbs';

		renderCatalogPage();

		expect(screen.getByTestId(breadcrumbsTestId)).toBeInTheDocument();
	});

	it('should render sort list', () => {
		const sortListTestId = 'sort-list';

		renderCatalogPage();

		expect(screen.getByTestId(sortListTestId)).toBeInTheDocument();
	});

	it('should render cards list', () => {
		const cardsListTestId = 'cards-list';

		renderCatalogPage();

		expect(screen.getByTestId(cardsListTestId)).toBeInTheDocument();
	});

	it('should render not found cake section', () => {
		const NotFoundCakeTestId = 'not-found-cake';

		renderCatalogPage();

		expect(screen.getByTestId(NotFoundCakeTestId)).toBeInTheDocument();
	});

	it('should render clauses section', () => {
		const clausesTestId = 'clauses';

		renderCatalogPage();

		expect(screen.getByTestId(clausesTestId)).toBeInTheDocument();
	});

	it('should render nothing when loading status is not success', () => {
		const component = withHistory(<CatalogPage cakes={[fakeCake]} />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Data]: {
				cakeOffers: [],
				offersLoadingStatus: LoadingStatus.Loading,
				orderSendingStatus: 'Idle'
			}
		});
		const { container } = render(withStoreComponent);

		expect(container.innerHTML).toBe('');
	});
});
