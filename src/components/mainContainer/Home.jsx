import React from "react";
import Delivery from "./../../assets/delivery.png";
import HeroBg from "./../../assets/heroBg.png";
import { motion } from "framer-motion";
import { heroData } from "../../srcUtils/data";

const Home = () => {
  return (
    <div className="grid gap-3 md:grid-cols-2 md:gap-5 max-w-[1400px] mx-auto">
      <div className="flex flex-col justify-center md:items-center py-2 flex-1 gap-6">
        <div className="self-start flex items-center gap-3 justify-center bg-orange-200 p-2 rounded-full">
          <p className="text-base font-semibold text-orange-500">
            Bike Delivery
          </p>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor leading-tight sm:self-start">
          The Fastest Delivery{" "}
          <span className="text-orange-600 text-[3rem] md:text-[4rem]">
            in your city
          </span>
        </p>
        <p className="text-base text-textColor text-left self-start">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          quisquam quasi maiores labore vel, nesciunt eaque ut nisi velit optio.
        </p>

        <motion.button
          whileTap={{ scale: 0.6 }}
          className="hover:shadow-lg transition-all ease-in-out duration-300 bg-gradient-to-br from-orange-500 to-orange-600 py-2 rounded-md sm:self-start sm:px-10"
          type="button"
        >
          Order Now!
        </motion.button>
      </div>
      <div className="relative flex-1 flex items-start">
        <img
          className="ml-auto h-420 w-full lg:w-auto lg:h-650"
          src={HeroBg}
          alt="hero-bg"
        />

        <div className="absolute w-full h-full top-0 left-0 py-4 flex flex-wrap items-center justify-center gap-x-4">
          {heroData &&
            heroData.map((data) => (
              <div
                key={data.id}
                className="shadow-xl lg:w-190 p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center"
              >
                <img
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 object-contain"
                  src={data.imageSrc}
                  alt={`${data.imageSrc}`}
                />
                <p className="text-sm lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {data.name}
                </p>
                <p className="text-[10px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3">
                  {data.desc}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {data.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
