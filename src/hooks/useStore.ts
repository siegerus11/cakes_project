import {
	ActionCreatorsMapObject,
	bindActionCreators,
	AsyncThunk
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, State } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
	...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key];
};

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useAppDispatch();
	return useMemo(
		() => bindActionCreators(actions, dispatch),
		[actions, dispatch]
	);
};
