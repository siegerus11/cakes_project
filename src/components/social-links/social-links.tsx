import { ReactNode } from 'react';
/* eslint-disable-next-line import/no-unresolved */
import { v4 as uuidv } from 'uuid';

import styles from './social-links.module.scss';

type SocialLinksProps = {
	children: ReactNode[];
};

const SocialLinks = ({ children }: SocialLinksProps) => {
	return (
		<ul className={styles.list}>
			{children.map(child => {
				const id = uuidv();
				return <li key={id}>{child}</li>;
			})}
		</ul>
	);
};

export default SocialLinks;
