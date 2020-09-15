import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0 as number,
	reducers: {
		increment(state, action: PayloadAction<number>) {
			return state + action.payload;
		},
	},
});
