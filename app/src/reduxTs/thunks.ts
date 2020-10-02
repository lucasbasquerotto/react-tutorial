import type { Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { RootState } from './store';
import { sendMessage } from './store/chat/actions';

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const thunkSendMessage = (message: string): AppThunk => async (
	dispatch,
) => {
	const asyncResp = await exampleAPI();
	dispatch(
		sendMessage({
			message,
			user: asyncResp,
			timestamp: new Date().getTime(),
		}),
	);
};

async function exampleAPI() {
	return Promise.resolve('Async Chat Bot');
}
