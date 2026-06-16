import { render, screen } from '@testing-library/react';

import withHistory from '../../mocks/withHistory';
import AboutPage from './about-page';

jest.mock('./importance/importance', () => {
	const MockImportance = () => <div data-testid="importance">Importance</div>;
	return { __esModule: true, default: MockImportance };
});

jest.mock('./rewievs/rewievs', () => {
	const MockRewievs = () => <div data-testid="rewievs">Rewievs</div>;
	return { __esModule: true, default: MockRewievs };
});

jest.mock('../../components/bread-crumbs/bread-crumbs', () => {
	const MockBreadCrumbs = () => (
		<nav data-testid="breadcrumbs" aria-label="Хлебные крошки" />
	);
	return { __esModule: true, default: MockBreadCrumbs };
});

describe('Component: AboutPage', () => {
	const renderAboutPage = () => {
		const component = withHistory(<AboutPage />);
		return render(component);
	};

	it('should render page title', () => {
		const expectedTitle = 'О нас';

		renderAboutPage();

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render main title', () => {
		const expectedMainTitle = /Вкусно, красиво и с любовью/i;

		renderAboutPage();

		expect(screen.getByText(expectedMainTitle)).toBeInTheDocument();
	});

	it('should render description', () => {
		const expectedDescription = /ВауКейк — современная кондитерская/i;

		renderAboutPage();

		expect(screen.getByText(expectedDescription)).toBeInTheDocument();
	});

	it('should render breadcrumbs', () => {
		const expectedLabelText = 'Хлебные крошки';

		renderAboutPage();

		expect(screen.getByLabelText(expectedLabelText)).toBeInTheDocument();
	});

	it('should render importance section', () => {
		const testId = 'importance';

		renderAboutPage();

		expect(screen.getByTestId(testId)).toBeInTheDocument();
	});
});
