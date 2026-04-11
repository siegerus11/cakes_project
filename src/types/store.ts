import { store } from '../store';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type Selector = Pick<State, keyof State>;
