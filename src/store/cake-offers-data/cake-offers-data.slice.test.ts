import { createAction } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../constants';
import makeFakeCakeOffer from '../../mocks/makeFakeOffer';
import makeFakeOrder from '../../mocks/makeFakeOrder';
import { cakeOffersData, cakeOffersDataActions } from './cake-offers-data';

describe('Cake-offers-data slice', () => {
	it('Should return initialState with empty action', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			cakeOffers: Array.from({ length: 3 }, makeFakeCakeOffer),
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		};

		const result = cakeOffersData.reducer(expectedState, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return default initial state with empty action and undefined state', () => {
		const emptyAction = { type: '' };
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Idle
		};

		const result = cakeOffersData.reducer(undefined, emptyAction);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with offersLoadingStatus: Loading', () => {
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Loading,
			orderSendingStatus: LoadingStatus.Idle
		};

		const fetchOffersPending = createAction('data/fetchOffers/pending');

		const result = cakeOffersData.reducer(undefined, fetchOffersPending());

		expect(result).toEqual(expectedState);
	});

	it('Should return state with offersLoadingStatus: Success and offer in cakeOffers', () => {
		const fakeOffer = makeFakeCakeOffer();
		const expectedState = {
			cakeOffers: [fakeOffer],
			offersLoadingStatus: LoadingStatus.Success,
			orderSendingStatus: LoadingStatus.Idle
		};

		const result = cakeOffersData.reducer(
			undefined,
			cakeOffersDataActions.fetchOffersAction.fulfilled(
				[fakeOffer],
				'',
				undefined
			)
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with offersLoadingStatus: Failed', () => {
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Failed,
			orderSendingStatus: LoadingStatus.Idle
		};

		const fetchOffersRejected = createAction('data/fetchOffers/rejected');
		const result = cakeOffersData.reducer(undefined, fetchOffersRejected());

		expect(result).toEqual(expectedState);
	});

	it('Should return state with orderSendingStatus: Loading', () => {
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Loading
		};

		const sendOrderPending = createAction('cart/sendOrder/pending');
		const result = cakeOffersData.reducer(undefined, sendOrderPending());

		expect(result).toEqual(expectedState);
	});

	it('Should return state with orderSendingStatus: Success', () => {
		const fakeOrder = {
			shoppingCart: [makeFakeOrder()],
			userData: {
				name: 'name',
				phone: 'phone',
				address: 'address',
				comment: 'comment'
			},
			finalSum: 1000
		};
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Success
		};

		const result = cakeOffersData.reducer(
			undefined,
			cakeOffersDataActions.sendOrderAction.fulfilled(
				undefined,
				'',
				fakeOrder
			)
		);

		expect(result).toEqual(expectedState);
	});

	it('Should return state with orderSendingStatus: Failed', () => {
		const expectedState = {
			cakeOffers: [],
			offersLoadingStatus: LoadingStatus.Idle,
			orderSendingStatus: LoadingStatus.Failed
		};

		const sendOrderRejected = createAction('cart/sendOrder/rejected');
		const result = cakeOffersData.reducer(undefined, sendOrderRejected());

		expect(result).toEqual(expectedState);
	});
});
