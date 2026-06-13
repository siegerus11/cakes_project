import { ReactNode } from 'react';

import styles from './social-links.module.scss';

type SocialLinksProps = {
	children: ReactNode[];
};

const SocialLinks = ({ children }: SocialLinksProps) => {
	return (
		<ul className={styles.list}>
			{children.map((child, i) => {
				const keyValue = `${i}-elem`;
				return <li key={keyValue}>{child}</li>;
			})}
		</ul>
	);
};

export default SocialLinks;
