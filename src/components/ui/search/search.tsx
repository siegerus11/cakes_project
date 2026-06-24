import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../../constants';
import { useActionCreators, useAppSelector } from '../../../hooks/useStore';
import { selectCakeOffers } from '../../../store/cake-offers-data/cake-offers-data';
import { mainProcessActions } from '../../../store/main-process/main-process';
import styles from './search.module.scss';

type SearchComponentProps = {};

const SearchComponent = (props: SearchComponentProps) => {
	const { setSearchQuerry } = useActionCreators(mainProcessActions);
	const cakeOffers = useAppSelector(selectCakeOffers);
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setSearchQuerry(searchValue);

			if (!searchValue.trim()) {
				return;
			}

			const matchedCakes = cakeOffers.filter(cake =>
				cake.title.toLowerCase().includes(searchValue.toLowerCase())
			);

			const matchedPath = matchedCakes.find(cake => cake.isBento)
				? AppRoute.BentoCakesCatalog
				: AppRoute.CakesCatalog;

			navigate(matchedPath);
		}, 500);

		return () => clearTimeout(timeout);
	}, [searchValue, setSearchQuerry]);

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
