import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute } from '../constants';
import { AppDispatch, State } from '../types/store';
import { CakeOffer, Order } from '../types/types';

export const fetchOffersAction = createAsyncThunk<
	CakeOffer[],
	undefined,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('data/fetchOffers', async (_arg, { extra: api }) => {
	const { data } = await api.get<CakeOffer[]>(APIRoute.offers);
	return data;
});

export const sendOrderAction = createAsyncThunk<
	void,
	Order,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('cart/sendOrder', async (order: Order, { extra: api }) => {
	await api.post(APIRoute.order, order);
});

export const getDiscountAction = createAsyncThunk<
	void,
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
	}
>('cart/getDiscount', async (code: string, { extra: api }) => {
	await api.post(APIRoute.promoCode, code);
});
