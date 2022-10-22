import React, { useEffect, useRef } from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { motion } from "framer-motion";
import NotFound from "./../../assets/NotFound.svg";
import { useDispatch } from "react-redux";
import { increaseCartNum, populateCartDetail } from "../../features/cartSlice";

const RowContainer = ({ flag, scrollValue, data }) => {
  const dispatch = useDispatch();
  const rowRef = useRef();

  useEffect(() => {
    rowRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  const activateCartSystem = (id, title, imageURL, price) => {
    dispatch(
      populateCartDetail({
        id: id,
        name: title,
        img: imageURL,
        price: price * 1,
        priceMain: price * 1,
        qty: 1,
      })
    );

    dispatch(increaseCartNum());
  };

  return (
    <div
      ref={rowRef}
      className={`w-full flex items-center gap-x-5 my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden justify-center flex-wrap"
      }`}
    >
      {data && data.length > 0 ? (
        data.map(
          ({
            id,
            data: { category, calories, imageURL, price, qty, title },
          }) => (
            <div
              key={id}
              className="w-[280px] min-w-[280px] md:w-320 md:min-w-[320px] cursor-pointer md:hover:drop-shadow-lg h-auto my-12 bg-cardOverlay shadow-md backdrop-blur-md rounded-lg p-2"
            >
              <div className="w-full flex items-center justify-between">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  className="w-[120px] h-[120px] -mt-8 object-contain cursor-pointer"
                  src={imageURL}
                  alt=""
                />
                <motion.div
                  onClick={() => activateCartSystem(id, title, imageURL, price)}
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 grid place-items-center cursor-pointer hover:shadow-xl"
                >
                  <ShoppingBasketIcon className="text-white" />
                </motion.div>
              </div>

              <div className="w-full flex flex-col items-end justify-end">
                <p className="text-textColor font-semibold text-base md:text-lg">
                  {title}
                </p>
                <p className="mt-2">{calories} Calories</p>
                <div className="flex items-center gap-8">
                  <p className="text-lg text-headingColor font-semibold">
                    <span className="text-sm text-red-500">$</span> {price}
                  </p>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} alt="image-not-found" className="block h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
