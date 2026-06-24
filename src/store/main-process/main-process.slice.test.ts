import {
	mainProcess,
	mainProcessActions,
	mainProcessState
} from './main-process';

describe('Main-process slice', () => {
	it('Should return initialState with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState: mainProcessState = {
			totalPrice: 5000,
			activeOffer: 'offer-001',
			sortingStatus: 'Друзьям',
			errorText: ''
		};

		const result = mainProcess.reducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const emptyAction = { type: '' };
		const expectedState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			searchQuerry: '',
			errorText: ''
		};

		const result = mainProcess.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should set total price', () => {
		const initialState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			errorText: ''
		};
		const expectedState: mainProcessState = {
			...initialState,
			totalPrice: 3500
		};

		const result = mainProcess.reducer(
			initialState,
			mainProcessActions.setTotalPrice(3500)
		);

		expect(result).toEqual(expectedState);
	});

	it('Should set active offer', () => {
		const initialState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			errorText: ''
		};
		const expectedState: mainProcessState = {
			...initialState,
			activeOffer: 'offer-042'
		};

		const result = mainProcess.reducer(
			initialState,
			mainProcessActions.setActiveOffer('offer-042')
		);

		expect(result).toEqual(expectedState);
	});

	it('Should set sorting status', () => {
		const initialState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			errorText: ''
		};
		const expectedState: mainProcessState = {
			...initialState,
			sortingStatus: 'Детям'
		};

		const result = mainProcess.reducer(
			initialState,
			mainProcessActions.getSortingStatus('Детям')
		);

		expect(result).toEqual(expectedState);
	});

	it('Should set error message', () => {
		const initialState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			errorText: ''
		};
		const expectedState: mainProcessState = {
			...initialState,
			errorText: 'Что-то пошло не так'
		};

		const result = mainProcess.reducer(
			initialState,
			mainProcessActions.setError('Что-то пошло не так')
		);

		expect(result).toEqual(expectedState);
	});

	it('Should clear error message', () => {
		const initialState: mainProcessState = {
			totalPrice: 0,
			activeOffer: '',
			sortingStatus: '',
			errorText: 'Что-то пошло не так'
		};
		const expectedState: mainProcessState = {
			...initialState,
			errorText: ''
		};

		const result = mainProcess.reducer(
			initialState,
			mainProcessActions.setError('')
		);

		expect(result).toEqual(expectedState);
	});
});
