import { screen, render } from '@testing-library/react';

import { AppRoute } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import { CakeOffer } from '../../types/types';
import Card, { AllCard } from './card';

const fakeCake = makeFakeCakeOffer();

describe('Component: Card', () => {
	const renderCard = (cake: CakeOffer, isMainPage: boolean) => {
		const componentWithHistory = withHistory(
			<Card cake={cake} isMainPage={isMainPage} />
		);
		const { withStoreComponent } = withStore(componentWithHistory);
		return render(withStoreComponent);
	};

	it('should render cake title', () => {
		const expectedTitle = 'title';

		renderCard(fakeCake, true);

		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
	});

	it('should render cake price', () => {
		const expectedPrice = `${fakeCake.price} ₽`;

		renderCard(fakeCake, true);

		expect(screen.getByText(expectedPrice)).toBeInTheDocument();
	});

	it('should render cake image', () => {
		const expectedAlt = 'title';

		renderCard(fakeCake, true);

		expect(screen.getByAltText(expectedAlt)).toBeInTheDocument();
	});

	it('should render add to cart button', () => {
		const expectedLabel = 'Добавить в корзину';

		renderCard(fakeCake, true);

		expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
	});

	it('should link to cake article page', () => {
		const expectedPath = `/cake-offer/${fakeCake.id}`;

		renderCard(fakeCake, true);

		const link = screen.getByRole('link');
		expect(link.getAttribute('href')).toBe(expectedPath);
	});
});

describe('Component: AllCard', () => {
	const renderAllCard = (images: string[] | undefined, path?: string) => {
		const componentWithHistory = withHistory(
			<AllCard images={images} path={path} />
		);
		const { withStoreComponent } = withStore(componentWithHistory);
		return render(withStoreComponent);
	};

	it('should render all images', () => {
		renderAllCard(fakeCake.images);

		fakeCake.images.forEach((image, i) => {
			expect(
				screen.getByAltText(`Торт "${image}" - изображение ${i + 1}`)
			).toBeInTheDocument();
		});
	});

	it('should render "Открыть все" text', () => {
		const expectedText = 'Открыть все';

		renderAllCard(fakeCake.images);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should link to catalog by default', () => {
		const expectedPath = AppRoute.Catalog;

		renderAllCard(fakeCake.images);

		const link = screen.getByRole('link');
		expect(link.getAttribute('href')).toBe(expectedPath);
	});

	it('should link to custom path when provided', () => {
		const expectedPath = AppRoute.CakesCatalog;

		renderAllCard(fakeCake.images, expectedPath);

		const link = screen.getByRole('link');
		expect(link.getAttribute('href')).toBe(expectedPath);
	});
});
