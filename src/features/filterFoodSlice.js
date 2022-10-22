import { createSlice } from "@reduxjs/toolkit";

export const filterFoodSlice = createSlice({
  name: "filterFood",
  initialState: {
    filter: "chicken",
  },

  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { updateFilter } = filterFoodSlice.actions;

export const selectFilter = (state) => state.filterFood.filter;

export default filterFoodSlice.reducer;
