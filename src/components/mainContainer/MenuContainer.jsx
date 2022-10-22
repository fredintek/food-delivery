import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { categoriesData } from "../../srcUtils/data";
import RowContainer from "./RowContainer";
import { useDispatch, useSelector } from "react-redux";
import { selectFilter, updateFilter } from "./../../features/filterFoodSlice";
import { selectFoodItem } from "../../features/foodItemSlice";

const MenuContainer = () => {
  const dispatch = useDispatch();
  const foodItems = useSelector(selectFoodItem);

  const foodFilter = useSelector(selectFilter);

  const [filter, setFilter] = useState("chicken");

  useEffect(() => {
    dispatch(updateFilter(filter));
  }, [filter]);

  const filteredItems = foodItems.filter(
    (item) => item.data.category === foodFilter
  );

  return (
    <section id="menu" className="w-full max-w-[1400px] mx-auto">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-lg self-start text-headingColor font-semibold uppercase relative before:absolute before:rounded-lg before:content before:w-12 before:h-1 before:-bottom-1 before:left-0 before:bg-orange-500 transition-all ease-in-out duration-300">
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 mt-6 overflow-x-scroll scrollbar-none py-6">
          {categoriesData &&
            categoriesData.map((category) => (
              <motion.div
                onClick={() => setFilter(category.urlParamName)}
                key={category.id}
                whileTap={{ scale: 0.75 }}
                className={`group ${
                  filter === category.urlParamName ? "bg-red-600" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl hover:bg-red-500 flex flex-col gap-3 items-center justify-center duration-300 transition-all ease-in-out`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    filter === category.urlParamName ? "bg-card" : "bg-red-600"
                  } bg-red-600 group-hover:bg-card flex items-center justify-center`}
                >
                  <FastfoodIcon
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-card"
                    } text-lg group-hover:text-textColor`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer flag={false} data={filteredItems} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
