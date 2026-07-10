import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosError } from 'axios';

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
	{ discount: number; discountedSum: number },
	string,
	{
		dispatch: AppDispatch;
		state: State;
		extra: AxiosInstance;
		rejectValue: string;
	}
>('cart/getDiscount', async (code: string, { extra: api, getState, rejectWithValue }) => {
	const { shoppingCart } = getState().CART;

	try {
		const { data } = await api.post<{
			valid: boolean;
			discount: number;
			discountedSum: number;
		}>(APIRoute.promoCode, {
			code,
			shoppingCart
		});

		if (!data.valid) {
			return rejectWithValue('invalid_promo');
		}

		return { discount: data.discount, discountedSum: data.discountedSum };
	} catch (error) {
		const axiosError = error as AxiosError<{ valid?: boolean }>;
		if (axiosError.response?.data?.valid === false) {
			return rejectWithValue('invalid_promo');
		}
		return rejectWithValue('server_error');
	}
});
