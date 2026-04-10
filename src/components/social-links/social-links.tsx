import { ReactNode } from 'react';
import styles from './social-links.module.scss';

type SocialLinksProps = {
	children: ReactNode[];
};

const SocialLinks = ({ children }: SocialLinksProps) => {
	return (
		<ul className={styles.list}>
			<li>{children[0]}</li>
			<li>{children[1]}</li>
			<li>{children[2]}</li>
		</ul>
	);
};

export default SocialLinks;
