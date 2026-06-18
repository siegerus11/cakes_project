import { createAsyncThunk } from '@reduxjs/toolkit';

import { ERROR_TIMEOUT } from '../constants';
import store from '../store';
import { mainProcessActions } from '../store/main-process/main-process';

const { setError } = mainProcessActions;

export const clearErrorAction = createAsyncThunk('data/clear-error', () => {
	setTimeout(() => {
		store.dispatch(setError(''));
	}, ERROR_TIMEOUT);
});

export const processErrorHandle = (message: string) => {
	store.dispatch(setError(message));
	store.dispatch(clearErrorAction());
};
