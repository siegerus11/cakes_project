import { screen, render } from '@testing-library/react';

import { NameSpace } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import withHistory from '../../mocks/withHistory';
import withStore from '../../mocks/withStore';
import { CakeOffer } from '../../types/types';
import CardsList from './cards-list';

const fakeCake = makeFakeCakeOffer();

describe('Component: CardsList', () => {
	const renderCardsList = (
		cakes: CakeOffer[],
		isMainPage: boolean,
		path?: string,
		initialState?: Record<string, unknown>
	) => {
		const componentWithHistory = withHistory(
			<CardsList cakes={cakes} isMainPage={isMainPage} path={path} />
		);
		const { withStoreComponent } = withStore(componentWithHistory, {
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus: '',
				errorText: ''
			},
			...initialState
		});
		return render(withStoreComponent);
	};

	const mockCakes: CakeOffer[] = [
		{ ...fakeCake, id: '1', title: 'Торт 1' },
		{ ...fakeCake, id: '2', title: 'Торт 2' },
		{ ...fakeCake, id: '3', title: 'Торт 3' }
	];

	it('should render correct number of cards', () => {
		const expectedCardsCount = 3;

		renderCardsList(mockCakes, false);

		const cards = screen.getAllByTestId('card');
		expect(cards.length).toBe(expectedCardsCount);
	});

	it('should apply sorting by category when sortingStatus is set', () => {
		const cakesWithCategories: CakeOffer[] = [
			{ ...fakeCake, id: '1', title: 'Торт 1', category: 'Друзьям' },
			{ ...fakeCake, id: '2', title: 'Торт 2', category: 'Родителям' },
			{ ...fakeCake, id: '3', title: 'Торт 3', category: 'Друзьям' }
		];

		const initialState = {
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus: 'Друзьям',
				errorText: ''
			}
		};

		renderCardsList(cakesWithCategories, false, undefined, initialState);

		const cards = screen.getAllByTestId('card');
		expect(cards.length).toBe(2);
		expect(screen.getByText('Торт 1')).toBeInTheDocument();
		expect(screen.getByText('Торт 3')).toBeInTheDocument();
		expect(screen.queryByText('Торт 2')).not.toBeInTheDocument();
	});

	it('should not apply sorting on main page', () => {
		const cakesWithCategories: CakeOffer[] = [
			{ ...fakeCake, id: '1', title: 'Торт 1', category: 'Друзьям' },
			{ ...fakeCake, id: '2', title: 'Торт 2', category: 'Родителям' }
		];

		const initialState = {
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus: 'Друзьям',
				errorText: ''
			}
		};

		renderCardsList(cakesWithCategories, true, undefined, initialState);

		const cards = screen.getAllByTestId('card');
		expect(cards.length).toBe(2);
	});
});