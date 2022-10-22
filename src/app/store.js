import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../features/userSlice";
import foodItemReducer from "./../features/foodItemSlice";
import filterFoodReducer from "./../features/filterFoodSlice";
import cartReducer from "./../features/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    foodItem: foodItemReducer,
    filterFood: filterFoodReducer,
    cart: cartReducer,
  },
});
