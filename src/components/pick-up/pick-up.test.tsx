import { render, screen, fireEvent } from '@testing-library/react';

import { address } from '../../constants';
import { RouteData } from '../../types/types';
import PickUp from './pick-up';

jest.mock('../map/map', () => {
	const MockMap = ({
		route,
		isDeliverPage
	}: {
		route: RouteData | null;
		isDeliverPage?: boolean;
	}) => (
		<div
			data-testid="map"
			data-route={route ? 'has-route' : 'no-route'}
			data-deliver={String(isDeliverPage)}
		/>
	);
	return { __esModule: true, default: MockMap };
});

describe('Component: PickUp', () => {
	const renderPickUp = (
		isDeliverPage?: boolean,
		headlineText = 'Забрать заказ',
		wrapperClass = 'test-wrapper'
	) => {
		return render(
			<PickUp
				headlineText={headlineText}
				wrapperClass={wrapperClass}
				isDeliverPage={isDeliverPage}
			/>
		);
	};

	it('should render wrapper with correct classes', () => {
		const { container } = renderPickUp();

		const wrapper = container.querySelector('.test-wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	it('should render address', () => {
		const expectedAddress = address;

		renderPickUp();

		expect(screen.getByText(expectedAddress)).toBeInTheDocument();
	});

	it('should render build route button', () => {
		const expectedButtonText = 'Построить маршрут';

		renderPickUp();

		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});

	it('should render additional text', () => {
		const expectedText = /Пожалуйста, оформите всё заранее/i;

		renderPickUp();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render map component', () => {
		renderPickUp();

		expect(screen.getByTestId('map')).toBeInTheDocument();
	});

	it('should render time info only on deliver page', () => {
		const expectedTimeText =
			'Забрать заказ можно с 8:00 до 21:00, без выходных.';

		renderPickUp(true);

		expect(screen.getByText(expectedTimeText)).toBeInTheDocument();
	});

	it('should not render time info when not deliver page', () => {
		const expectedTimeText =
			'Забрать заказ можно с 8:00 до 21:00, без выходных.';

		renderPickUp(false);

		expect(screen.queryByText(expectedTimeText)).not.toBeInTheDocument();
	});

	it('should have clickable build route button', () => {
		renderPickUp();

		const button = screen.getByText('Построить маршрут');
		fireEvent.click(button);

		expect(button).toBeInTheDocument();
	});

	it('should pass isDeliverPage to Map component', () => {
		renderPickUp(true);

		const map = screen.getByTestId('map');
		expect(map.getAttribute('data-deliver')).toBe('true');
	});

	it('should pass isDeliverPage=false to Map component by default', () => {
		renderPickUp();

		const map = screen.getByTestId('map');
		expect(map.getAttribute('data-deliver')).toBe('false');
	});
});
