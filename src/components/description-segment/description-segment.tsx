import { PropsWithChildren } from 'react';

import { TitleLevel } from '../../types/types';
import Title from '../title/title';
import styles from './description-segment.module.scss';

type DescriptionSegmentProps = PropsWithChildren<{
	wrapperClass: string;
	titleClass?: string;
	titleLevel?: TitleLevel;
	titleText: string;
}>;

const DescriptionSegment = ({
	children,
	wrapperClass,
	titleClass,
	titleLevel,
	titleText
}: DescriptionSegmentProps) => {
	return (
		<div className={wrapperClass}>
			<Title
				titleClass={`description-segment-title ${titleClass}`}
				level={titleLevel}
				titleText={titleText}
			/>
			{children}
		</div>
	);
};

export default DescriptionSegment;
