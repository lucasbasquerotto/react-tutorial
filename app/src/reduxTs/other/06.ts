import { createReducer, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 0;
const counterReducer = createReducer(initialState, {
	increment: (state, action: PayloadAction<number>) => state + action.payload,
});

counterReducer && (() => {})();
