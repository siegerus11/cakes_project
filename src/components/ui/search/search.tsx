import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../constants';
import useDebounce from '../../../hooks/useDebounce';
import { useActionCreators } from '../../../hooks/useStore';
import { mainProcessActions } from '../../../store/main-process/main-process';
import styles from './search.module.scss';

type SearchComponentProps = {};

const SearchComponent = (props: SearchComponentProps) => {
	const { setSearchQuery } = useActionCreators(mainProcessActions);
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue, 500);

	useEffect(() => {
		setSearchQuery(debouncedSearchValue);
		if (debouncedSearchValue.trim()) navigate(AppRoute.Search);
	}, [setSearchQuery, debouncedSearchValue]);

	const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

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
				value={searchValue}
				name="search"
				type="search"
				placeholder="Поиск"
				aria-label="Поиск по товарам"
				onChange={handleSearchInputChange}
			/>
		</div>
	);
};

export default SearchComponent;
