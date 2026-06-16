import { render, screen, fireEvent } from '@testing-library/react';

import { SORT_KINDS, NameSpace } from '../../../constants';
import withHistory from '../../../mocks/withHistory';
import withStore from '../../../mocks/withStore';
import SortList, { SortItem } from './sort-list';

describe('Component: SortList', () => {
	const renderSortList = (sortingStatus = '') => {
		const component = withHistory(<SortList />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus,
				errorText: ''
			}
		});
		return render(withStoreComponent);
	};

	it('should render all sort kinds', () => {
		renderSortList();

		SORT_KINDS.forEach(kind => {
			expect(screen.getByText(kind)).toBeInTheDocument();
		});
	});

	it('should render sort items as buttons', () => {
		renderSortList();

		const buttons = screen.getAllByRole('button');
		expect(buttons.length).toBe(SORT_KINDS.length);
	});
});

describe('Component: SortItem', () => {
	const renderSortItem = (
		sortKind: (typeof SORT_KINDS)[number],
		sortingStatus = ''
	) => {
		const component = withHistory(<SortItem sortKind={sortKind} />);
		const { withStoreComponent } = withStore(component, {
			[NameSpace.Main]: {
				totalPrice: 0,
				activeOffer: '',
				sortingStatus,
				errorText: ''
			}
		});
		return render(withStoreComponent);
	};

	it('should render sort kind text', () => {
		const expectedText = 'Друзьям';

		renderSortItem(expectedText);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should dispatch getSortingStatus on click', () => {
		renderSortItem('Друзьям');

		const button = screen.getByText('Друзьям');
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
	});
});
