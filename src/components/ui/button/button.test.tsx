import { render, screen, fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';

import { AppRoute } from '../../../constants';
import withHistory from '../../../mocks/withHistory';
import Button from './button';

describe('Component: Button', () => {
	const renderButton = ({
		className = 'test-button',
		label,
		isOuterLink,
		url,
		onClick,
		onTouchStart,
		path,
		children = 'Click me'
	}: {
		className?: string;
		label?: string;
		isOuterLink?: boolean;
		url?: string;
		onClick?: () => void;
		onTouchStart?: () => void;
		path?: string;
		children?: ReactNode;
	} = {}) => {
		const component = (
			<Button
				className={className}
				label={label}
				isOuterLink={isOuterLink}
				url={url}
				onClick={onClick}
				onTouchStart={onTouchStart}
				path={path}
			>
				{children}
			</Button>
		);
		return render(withHistory(component));
	};

	it('should render button by default', () => {
		const expectedButtonText = 'Click me';

		renderButton();

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.textContent).toBe(expectedButtonText);
	});

	it('should apply className to button', () => {
		const expectedClassName = 'custom-class';

		renderButton({ className: expectedClassName });

		const button = screen.getByRole('button');
		expect(button.className).toBe(expectedClassName);
	});

	it('should render as Link when path is provided', () => {
		renderButton({ path: AppRoute.About });

		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(AppRoute.About);
	});

	it('should apply className to Link', () => {
		const expectedClassName = 'link-class';

		renderButton({ path: AppRoute.Catalog, className: expectedClassName });

		const link = screen.getByRole('link');
		expect(link.className).toBe(expectedClassName);
	});

	it('should render as outer link when isOuterLink is true', () => {
		const expectedUrl = 'https://example.com';

		renderButton({ isOuterLink: true, url: expectedUrl });

		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(expectedUrl);
	});

	it('should apply aria-label to outer link', () => {
		const expectedLabelText = 'External';

		renderButton({
			isOuterLink: true,
			url: 'https://example.com',
			label: expectedLabelText
		});

		const link = screen.getByLabelText(expectedLabelText);
		expect(link).toBeInTheDocument();
	});

	it('should call onClick when button is clicked', () => {
		const mockOnClick = jest.fn();

		renderButton({ onClick: mockOnClick });

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockOnClick).toHaveBeenCalledTimes(1);
	});

	it('should apply aria-label to button', () => {
		const expectedLabelText = 'Submit';

		renderButton({ label: 'Submit' });

		const button = screen.getByLabelText(expectedLabelText);
		expect(button).toBeInTheDocument();
	});

	it('should set type="button" on button', () => {
		renderButton();

		const button = screen.getByRole('button');
		expect(button.getAttribute('type')).toBe('button');
	});
});
