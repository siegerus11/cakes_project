import { PropsWithChildren } from 'react';

type OuterLinkButtonProps = PropsWithChildren<{
	className: string;
	url: string;
	label?: string;
}>;

const OuterLinkButton = ({
	children,
	className,
	url,
	label
}: OuterLinkButtonProps) => (
	<a className={className} href={url} aria-label={label}>
		{children}
	</a>
);

export default OuterLinkButton;
