import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { increaseQty, reduceQty } from "../../features/cartSlice";

const EachCartItem = ({ id, img, name, price, quantity }) => {
  const dispatch = useDispatch();

  const handleCartMod = (param) => {
    if (param === "add") {
      dispatch(increaseQty(id));
    } else {
      dispatch(reduceQty(id));
    }
  };

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
      <img
        src={img}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{name}</p>
        <p className="text-sm block text-gray-300 font-semibold">${price}</p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          onClick={() => handleCartMod("reduce")}
          whileTap={{ scale: 0.75 }}
        >
          <RemoveIcon className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {quantity}
        </p>
        <motion.div
          onClick={() => handleCartMod("add")}
          whileTap={{ scale: 0.75 }}
        >
          <AddIcon className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default EachCartItem;
