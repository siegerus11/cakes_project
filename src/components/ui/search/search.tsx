import { ChangeEvent, useEffect, useState } from 'react';

import { useActionCreators, useAppSelector } from '../../../hooks/useStore';
import {
	mainProcessActions,
	selectSearchQuerry
} from '../../../store/main-process/main-process';
import styles from './search.module.scss';

type SearchComponentProps = {};

const SearchComponent = (props: SearchComponentProps) => {
	const { setSearchQuerry } = useActionCreators(mainProcessActions);
	const searchQuerry = useAppSelector(selectSearchQuerry);

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearchQuerry(searchValue);
		}, 500);

		return () => clearTimeout(timeout);
	}, [searchValue, searchQuerry, setSearchQuerry]);

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
				type="search"
				placeholder="Поиск"
				aria-label="Поиск по товарам"
				onChange={handleSearchInputChange}
			/>
		</div>
	);
};

export default SearchComponent;
