import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppDispatch, State } from '../types/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
