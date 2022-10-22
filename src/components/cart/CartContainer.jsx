import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartDetail,
  selectShoppingCartAccess,
  triggerShoppingCart,
} from "../../features/cartSlice";
import NoItem from "./../../assets/emptyCart.svg";
import EachCartItem from "./EachCartItem";

const CartContainer = () => {
  const dispatch = useDispatch();
  const cartAccess = useSelector(selectShoppingCartAccess);
  const cardDetail = useSelector(selectCartDetail);
  const cartDetail = useSelector(selectCartDetail);

  const subTotal = cartDetail
    .map((obj) => obj.price)
    .reduce((prev, curr) => prev + curr, 0);

  return (
    <div
      className={`fixed top-[103px] transition-all duration-[400ms] ease-in-out z-50 right-0 w-full md:w-375 h-[calc(100vh-103px)] bg-white drop-shadow-md flex flex-col ${
        cartAccess ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-full flex items-center justify-between p-4">
        <motion.div
          onClick={() => dispatch(triggerShoppingCart())}
          whileTap={{ scale: 0.75 }}
        >
          <ArrowBackIcon className="text-textColor text-3xl cursor-pointer" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={() => dispatch(clearCart())}
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RefreshIcon />
        </motion.p>
      </div>

      {/* bottom section */}
      {cardDetail && cardDetail.length > 0 ? (
        <div className="w-full bg-cartBg h-full rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* each cart item */}
            {cardDetail.map(({ id, img, name, price, qty }) => (
              <EachCartItem
                key={id}
                id={id}
                img={img}
                name={name}
                price={price}
                quantity={qty}
              />
            ))}
          </div>

          {/* card total */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {subTotal.toFixed(2)}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ {(2.5).toFixed(2)}</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {(subTotal + 2.5).toFixed(2)}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-300 ease-out"
            >
              Check Out
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white h-full flex flex-col">
          <img
            src={NoItem}
            className="block w-full h-[90%] object-contain"
            alt="no-item"
          />
          <p className="w-full text-center text-textColor text-2xl font-semibold uppercase">
            Add items to cart
          </p>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
