import type { PayloadAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';

const initialState = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
const counterReducer = createReducer(initialState, {
	increment: (state, action: PayloadAction<number>) => state + action.payload,
});
