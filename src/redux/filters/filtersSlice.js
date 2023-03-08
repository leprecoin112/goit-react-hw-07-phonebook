import { createSlice } from '@reduxjs/toolkit';
const filtersSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilterValue(_, action) {
      return action.payload;
    },
  },
});

export const { setFilterValue } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;

export const getFilterValue = state => state.filters;
