import { render, screen } from '@testing-library/react';

import DescriptionSegment from './description-segment';

describe('Component: DescriptionSegment', () => {
	it('should render children content', () => {
		render(
			<DescriptionSegment
				wrapperClass="test-class"
				titleText="Test Title"
			>
				<p>Child content</p>
			</DescriptionSegment>
		);

		expect(screen.getByText('Child content')).toBeInTheDocument();
	});

	it('should render title text', () => {
		const expectedTitleText = 'О нас';

		render(
			<DescriptionSegment
				wrapperClass="test-class"
				titleText={expectedTitleText}
			>
				<p>Content</p>
			</DescriptionSegment>
		);

		expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
	});

	it('should apply wrapper class to container', () => {
		const { container } = render(
			<DescriptionSegment wrapperClass="custom-wrapper" titleText="Test">
				<div>Content</div>
			</DescriptionSegment>
		);

		const wrapper = container.querySelector('.custom-wrapper');
		expect(wrapper).toBeInTheDocument();
	});

	it('should apply title class when provided', () => {
		const { container } = render(
			<DescriptionSegment
				wrapperClass="test-class"
				titleText="Test Title"
				titleClass="custom-title"
			>
				<div>Content</div>
			</DescriptionSegment>
		);

		const title = container.querySelector('.custom-title');
		expect(title).toBeInTheDocument();
	});

	it('should use h1 as default heading level', () => {
		const { container } = render(
			<DescriptionSegment wrapperClass="test-class" titleText="Test">
				<div>Content</div>
			</DescriptionSegment>
		);

		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
	});
});
