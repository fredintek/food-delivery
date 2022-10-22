import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    accessShoppingCart: false,
    cartNum: 0,
    cartDetail: [],
  },

  reducers: {
    setCartDetail: (state, action) => {
      state.cartDetail = action.payload;
    },

    triggerShoppingCart: (state) => {
      state.accessShoppingCart = !state.accessShoppingCart;
    },

    increaseCartNum: (state) => {
      state.cartNum += 1;
    },

    increaseQty: (state, action) => {
      for (let i = 0; i < state.cartDetail.length; i++) {
        if (state.cartDetail[i]["id"] === action.payload) {
          state.cartNum += 1;
          state.cartDetail[i].qty += 1;
          state.cartDetail[i].price += state.cartDetail[i].priceMain;
        }
      }
    },

    reduceQty: (state, action) => {
      for (let i = 0; i < state.cartDetail.length; i++) {
        if (
          state.cartDetail[i]["id"] === action.payload &&
          state.cartDetail[i].qty === 1
        ) {
          state.cartNum -= 1;
          state.cartDetail[i].price -= state.cartDetail[i].priceMain;
          state.cartDetail.splice(
            state.cartDetail.findIndex((a) => a.id === action.payload),
            1
          );
        } else {
          if (state.cartDetail[i]["id"] === action.payload) {
            state.cartNum -= 1;
            state.cartDetail[i].price -= state.cartDetail[i].priceMain;
            state.cartDetail[i].qty -= 1;
          }
        }
      }
    },

    decreaseCartNum: (state) => {
      state.cartNum -= 1;
      if (state.cartNum === 0) return;
    },

    populateCartDetail: (state, action) => {
      if (!state.cartDetail) state.cartDetail.push(action.payload);

      const containsObject = (obj, list) => {
        let i;
        for (i = 0; i < list.length; i++) {
          if (list[i].name === obj.name) {
            list[i].qty += 1;
            return true;
          }
        }

        return false;
      };

      if (!containsObject(action.payload, state.cartDetail)) {
        state.cartDetail.push(action.payload);
      }
    },

    clearCart: (state) => {
      state.cartDetail = [];
    },
  },
});

export const {
  triggerShoppingCart,
  populateCartDetail,
  increaseCartNum,
  decreaseCartNum,
  increaseQty,
  reduceQty,
  clearCart,
  setCartDetail,
} = cartSlice.actions;

export const selectShoppingCartAccess = (state) =>
  state.cart.accessShoppingCart;

export const selectCartDetail = (state) => state.cart.cartDetail;

export const selectCartNum = (state) => state.cart.cartNum;

export default cartSlice.reducer;
