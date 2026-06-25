import { render, screen } from '@testing-library/react';

import withHistory from '../../mocks/withHistory';
import ThanksPage from './thanks-page';

describe('Component: ThanksPage', () => {
	const renderThanksPage = () => {
		const withHistoryComponent = withHistory(<ThanksPage />);

		return render(withHistoryComponent);
	};

	it('Should render correctly', () => {
		const expectedText = /Заказ принят/i;

		renderThanksPage();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
