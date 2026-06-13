import { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';

export default function withHistory(component: ReactElement, history?: string) {
	const route = [history ?? '/'];

	return (
		<MemoryRouter
			future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
			initialEntries={route}
		>
			{component}
		</MemoryRouter>
	);
}
