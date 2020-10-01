import { combineReducers } from '@reduxjs/toolkit';
import { chatReducer } from './chat/reducers';
import { systemReducer } from './system/reducers';

export const rootReducer = combineReducers({
	system: systemReducer,
	chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
