import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './filters/filtersSlice';
import { contactsApi } from 'redux/api/contactsApi/contactsApi';

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filters: filtersReducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
