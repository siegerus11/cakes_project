import { createSelector } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { State } from '../../types/store';

const selectFinalSum = createSelector(
	(state: State) => state[NameSpace.Cart].shoppingCart,
	shoppingCart =>
		shoppingCart.reduce(
			(sum, order) => sum + order.price * order.quantity,
			0
		)
);

export default selectFinalSum;
