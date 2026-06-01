import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute } from '../constants';
import { AppDispatch, State } from '../types/store';
import { CakeOffer } from '../types/types';

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

export const a = '';
