import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ThanksPage from './thanks-page';

describe('Component: ThanksPage', () => {
	it('Should render correctly', () => {
		const expectedText = /Заказ принят/i;

		render(
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true
				}}
			>
				<ThanksPage />
			</BrowserRouter>
		);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
