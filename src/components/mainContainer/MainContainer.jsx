import React, { useEffect, useState } from "react";
import Home from "./Home";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RowContainer from "./RowContainer";
import MenuContainer from "./MenuContainer";
import { useSelector } from "react-redux";
import { selectFoodItem } from "../../features/foodItemSlice";
import CartContainer from "../cart/CartContainer";

const MainContainer = () => {
  const foodItems = useSelector(selectFoodItem);
  const fruitsData = foodItems.filter((obj) => obj.data.category === "fruits");

  const [scrollValue, setScrollValue] = useState(0);

  return (
    <div className="flex flex-col w-full h-auto">
      <Home />
      <section className="w-full mt-16 md:mt-24 max-w-[1400px] mx-auto">
        <div className="w-full flex items-center justify-between">
          <p className="text-lg text-headingColor font-semibold uppercase relative before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-1 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-300">
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              onClick={() => setScrollValue(-200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center"
            >
              <ChevronLeftIcon className="text-lg text-white" />
            </motion.div>
            <motion.div
              onClick={() => setScrollValue(200)}
              whileTap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all ease-in-out duration-300 flex items-center justify-center"
            >
              <ChevronRightIcon className="text-lg text-white" />
            </motion.div>
          </div>
        </div>

        <RowContainer flag={true} scrollValue={scrollValue} data={fruitsData} />
      </section>

      <MenuContainer />

      <CartContainer />
    </div>
  );
};

export default MainContainer;
