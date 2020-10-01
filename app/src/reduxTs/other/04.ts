import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store/index';

const store = configureStore({
	reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
