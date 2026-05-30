import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, State } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
): Actions => {
	const dispatch = useAppDispatch();
	return useMemo(
		() => bindActionCreators(actions, dispatch),
		[actions, dispatch]
	);
};
