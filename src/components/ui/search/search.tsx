import styles from './search.module.scss';

type SearchComponentProps = {};

const SearchComponent = (props: SearchComponentProps) => {
	return (
		<div className={styles.search}>
			<svg
				className={styles.search__icon}
				viewBox="0 0 40 40"
				aria-hidden="true"
			>
				<use xlinkHref="#search"></use>
			</svg>
			<input
				className={styles.search__input}
				type="search"
				placeholder="Поиск"
				aria-label="Поиск по товарам"
			/>
		</div>
	);
};

export default SearchComponent;
