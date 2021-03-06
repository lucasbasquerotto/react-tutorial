import type { PayloadAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

const initialState = 0;
const counterReducer = createReducer(initialState, {
	increment: (state, action: PayloadAction<number>) => state + action.payload,
});

counterReducer && (() => {})();
