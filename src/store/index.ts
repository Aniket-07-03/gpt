import { configureStore } from '@reduxjs/toolkit';
import { unspentBalanceReducer, villageReducer } from './unSpentBalanceSlice';

export const store = configureStore({
  reducer: {
    unspentBalance: unspentBalanceReducer,
    village: villageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
