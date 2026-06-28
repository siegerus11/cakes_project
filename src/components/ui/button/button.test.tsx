import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import { AppRoute } from '../../../constants';
import withHistory from '../../../mocks/withHistory';
import { ActionButton, LinkButton, OuterLinkButton } from './button';

describe('Component: ActionButton', () => {
	const renderActionButton = ({
		className = 'test-button',
		label,
		onClick,
		children = 'Click'
	}: {
		className?: string;
		label?: string;
		onClick?: () => void;
		children?: ReactNode;
	} = {}) =>
		render(
			<ActionButton className={className} label={label} onClick={onClick}>
				{children}
			</ActionButton>
		);

	it('should render button by default', () => {
		const expectedChildrenText = 'Click';

		renderActionButton();

		const button = screen.getByRole('button');

		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe(expectedChildrenText);
	});

	it('should apply className', () => {
		const expectedClassName = 'custom-class';

		renderActionButton({ className: expectedClassName });

		expect(screen.getByRole('button').className).toBe(expectedClassName);
	});

	it('should apply aria-label', () => {
		const expectedLabel = 'action-button';

		renderActionButton({ label: expectedLabel });

		expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
	});

	it('should set type="button"', () => {
		renderActionButton();

		expect(screen.getByRole('button').getAttribute('type')).toBe('button');
	});

	it('should call onClick when button is clicked', () => {
		const mockOnClick = jest.fn();

		renderActionButton({ onClick: mockOnClick });

		screen.getByRole('button').click();

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});
});

describe('Component: LinkButton', () => {
	const renderLinkButton = ({
		className = 'test-link',
		path = AppRoute.About,
		label,
		children
	}: {
		className?: string;
		path?: string;
		label?: string;
		children?: ReactNode;
	} = {}) =>
		render(
			withHistory(
				<LinkButton className={className} path={path} label={label}>
					{children}
				</LinkButton>
			)
		);

	it('should render as Link', () => {
		renderLinkButton({ path: AppRoute.About });

		const link = screen.getByRole('link');

		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(AppRoute.About);
	});

	it('should apply className', () => {
		const expectedClassName = 'link-class';

		renderLinkButton({
			className: expectedClassName,
			path: AppRoute.Catalog
		});
		expect(screen.getByRole('link').className).toBe(expectedClassName);
	});
});

describe('Component: OuterLinkButton', () => {
	const expectedUrl = 'https://test.com';

	const renderOuterLinkButton = ({
		className = 'test-outer',
		url = expectedUrl,
		label,
		children
	}: {
		className?: string;
		url?: string;
		label?: string;
		children?: ReactNode;
	} = {}) =>
		render(
			<OuterLinkButton className={className} url={url} label={label}>
				{children}
			</OuterLinkButton>
		);

	it('should render as external link', () => {
		renderOuterLinkButton({ url: expectedUrl });

		const link = screen.getByRole('link');

		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(expectedUrl);
	});

	it('should apply aria-label', () => {
		const expectedLabel = 'external';

		renderOuterLinkButton({
			url: expectedUrl,
			label: expectedLabel
		});
		expect(screen.getByLabelText(expectedLabel)).toBeInTheDocument();
	});
});
