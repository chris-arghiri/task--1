import { configureStore } from '@reduxjs/toolkit';

import userReducer from './usersSlice';

export const store = configureStore({
  reducer: { users: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
