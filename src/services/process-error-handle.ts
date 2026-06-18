import { ERROR_TIMEOUT } from '../constants';
import store from '../store';
import { mainProcessActions } from '../store/main-process/main-process';
import { AppDispatch } from '../types/store';

const { setError } = mainProcessActions;

let clearTimer: ReturnType<typeof setTimeout> | null = null;

export const clearErrorAction = () => (dispatch: AppDispatch) => {
	if (clearTimer) {
		clearTimeout(clearTimer);
	}
	clearTimer = setTimeout(() => {
		dispatch(setError(''));
		clearTimer = null;
	}, ERROR_TIMEOUT);
};

export const processErrorHandle = (message: string) => {
	store.dispatch(setError(message));
	store.dispatch(clearErrorAction());
};
