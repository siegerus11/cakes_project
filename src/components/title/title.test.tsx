import { render, screen } from '@testing-library/react';

import { AppRoute } from '../../constants';
import withHistory from '../../mocks/withHistory';
import Title from './title';

describe('Component: Title', () => {
	const renderTitle = ({
		titleText = 'Test Title',
		path,
		titleClass,
		level = 'h1',
		hr = false
	}: {
		titleText?: string;
		path?: string;
		titleClass?: string;
		level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		hr?: boolean;
	} = {}) => {
		const component = (
			<Title
				titleText={titleText}
				path={path}
				titleClass={titleClass}
				level={level}
				hr={hr}
			/>
		);
		return render(withHistory(component));
	};

	it('should render title text', () => {
		const expectedText = 'Test Title';

		renderTitle();

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});

	it('should render h1 by default', () => {
		const headingText = 'Test Title';

		renderTitle();

		const heading = screen.getByText(headingText);
		expect(heading.tagName.toLowerCase()).toBe('h1');
	});

	it('should render custom heading level', () => {
		const headingText = 'Test Title';

		renderTitle({ level: 'h2' });

		const heading = screen.getByText(headingText);
		expect(heading.tagName.toLowerCase()).toBe('h2');
	});

	it('should render h3', () => {
		const headingText = 'Test Title';

		renderTitle({ level: 'h3' });

		const heading = screen.getByText(headingText);
		expect(heading.tagName.toLowerCase()).toBe('h3');
	});

	it('should apply title class', () => {
		const expectedClass = 'custom-title';
		const headingText = 'Test Title';

		renderTitle({ titleClass: expectedClass });

		const heading = screen.getByText(headingText);
		expect(heading.className).toContain(expectedClass);
	});

	it('should render as link when path is provided', () => {
		const expectedPath = AppRoute.About;

		renderTitle({ path: expectedPath });

		const link = screen.getByRole('link');
		expect(link).toBeInTheDocument();
		expect(link.getAttribute('href')).toBe(expectedPath);
	});

	it('should not render as link when path is not provided', () => {
		renderTitle();

		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});

	it('should render hr when hr is true', () => {
		renderTitle({ hr: true });

		const hrElement = document.querySelector('hr.title-hr');
		expect(hrElement).toBeInTheDocument();
	});

	it('should not render hr when hr is false', () => {
		renderTitle({ hr: false });

		const hrElement = document.querySelector('hr.title-hr');
		expect(hrElement).not.toBeInTheDocument();
	});
});
