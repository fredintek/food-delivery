import { createSlice } from "@reduxjs/toolkit";

export const foodItemSlice = createSlice({
  name: "foodItem",
  initialState: {
    item: null,
  },

  reducers: {
    populateItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { populateItem } = foodItemSlice.actions;

export const selectFoodItem = (state) => state.foodItem.item;

export default foodItemSlice.reducer;
