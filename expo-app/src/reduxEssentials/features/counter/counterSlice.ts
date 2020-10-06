/* eslint-disable no-param-reassign */
import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';

const NAME = 'counter';

export interface CounterState {
	value: number;
}

const initialState: CounterState = { value: 0 };

export const slice = createSlice({
	name: NAME,
	initialState,
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, { payload }: PayloadAction<number>) => {
			state.value += payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = slice.actions;

export type IncrementAsyncState = ReturnType<typeof slice.reducer>;

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type IncrementAsyncThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	IncrementAsyncState,
	unknown,
	Action<string>
>;

// The function below is called a thunk and allows us to perform async logic.
// It can be dispatched like a regular action: `dispatch(incrementAsync(10))`.
// This will call the thunk with the `dispatch` function as the first argument.
// Async code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): IncrementAsyncThunk => (
	dispatch,
) => {
	setTimeout(() => {
		dispatch(incrementByAmount(amount));
	}, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state: { [NAME]: CounterState }) =>
	state[NAME]?.value;
export const counterReducer = slice.reducer;
