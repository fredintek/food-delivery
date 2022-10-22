import React, { useState } from "react";

import Logo from "./../../assets/logo.png";
import Human from "./../../assets/avatar.png";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth, provider } from "./../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser, logout } from "./../../features/userSlice";
import { useEffect } from "react";
import {
  selectCartDetail,
  selectCartNum,
  triggerShoppingCart,
} from "../../features/cartSlice";

const Header = () => {
  const user = useSelector(selectUser);
  const cartNum = useSelector(selectCartNum);
  const cartDetail = useSelector(selectCartDetail);
  const [avatarOpt, setAvatarOpt] = useState(false);
  const dispatch = useDispatch();

  const loginNow = async () => {
    if (user) {
      setAvatarOpt(!avatarOpt);
      return;
    }
    try {
      const {
        user: { refreshToken, providerData },
      } = await auth.signInWithPopup(provider);
      // console.log(providerData, refreshToken);
      dispatch(
        login({
          userData: providerData[0],
        })
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const logoutNow = async () => {
    await auth.signOut();
    dispatch(logout());
    setAvatarOpt(!avatarOpt);
  };

  const accessShoppingCart = () => {
    dispatch(triggerShoppingCart());
  };

  return (
    <header className="fixed z-50 w-screen px-4 py-3 md:py-6 md:px-16 bg-primary">
      {/* desktop navigation */}
      <div className="hidden md:flex w-full h-full items-center justify-between max-w-[1400px] mx-auto">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-contain" src={Logo} alt="logo" />
          <p className="text-headingColor font-bold text-xl">Fredintek</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link
              to="/"
              className="cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out"
            >
              Home
            </Link>
            <a
              href="#menu"
              className="cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out"
            >
              Menu
            </a>
            <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out">
              About Us
            </li>
            <li className="cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out">
              Services
            </li>
          </motion.ul>

          <motion.div
            onClick={accessShoppingCart}
            whileTap={{ scale: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <ShoppingBasketIcon className="text-textColor text-2xl cursor-pointer" />

            {cartNum && cartNum > 0 && cartDetail.length > 0 ? (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg text-xs text-white font-semibold grid place-items-center">
                {cartNum}
              </span>
            ) : (
              ""
            )}
          </motion.div>

          <div className="relative">
            <IconButton onClick={loginNow}>
              <motion.img
                whileTap={{ scale: 0.6 }}
                className="inline-block w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                src={user ? user.userData.photoURL : Human}
                alt="avatar"
              />
            </IconButton>
            {avatarOpt && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-14 right-0"
              >
                {user && user.userData.email === "vethodee@gmail.com" && (
                  <Link
                    onClick={() => setAvatarOpt(!avatarOpt)}
                    to="/createItem"
                  >
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in text-textColor text-base">
                      New Item <AddIcon />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logoutNow}
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in text-textColor text-base"
                >
                  Logout <LogoutIcon />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div className="flex items-center justify-between w-full md:hidden">
        <motion.div
          onClick={accessShoppingCart}
          whileTap={{ scale: 0.6 }}
          className="relative flex items-center justify-center"
        >
          <ShoppingBasketIcon className="text-textColor text-2xl cursor-pointer" />
          {cartNum && cartNum > 0 && cartDetail.length > 0 ? (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg text-xs text-white font-semibold grid place-items-center">
              {cartNum}
            </span>
          ) : (
            ""
          )}
        </motion.div>

        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img className="w-8 object-contain" src={Logo} alt="logo" />
          <p className="text-headingColor font-bold text-xl">Fredintek</p>
        </Link>

        <div className="relative">
          <IconButton onClick={loginNow}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="inline-block w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              src={user ? user.userData.photoURL : Human}
              alt="avatar"
            />
          </IconButton>
          {avatarOpt && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex flex-col w-40 bg-gray-50 shadow-xl rounded-lg absolute top-14 right-0"
            >
              {user && user.userData.email === "vethodee@gmail.com" && (
                <Link onClick={() => setAvatarOpt(!avatarOpt)} to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in text-textColor text-base">
                    New Item <AddIcon />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <Link
                  to="/"
                  onClick={() => setAvatarOpt(!avatarOpt)}
                  className="px-4 py-2 cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out hover:bg-slate-100"
                >
                  Home
                </Link>
                <a
                  href="#menu"
                  onClick={() => setAvatarOpt(!avatarOpt)}
                  className="px-4 py-2 cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out hover:bg-slate-100"
                >
                  Menu
                </a>
                <li
                  onClick={() => setAvatarOpt(!avatarOpt)}
                  className="px-4 py-2 cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out hover:bg-slate-100"
                >
                  About Us
                </li>
                <li
                  onClick={() => setAvatarOpt(!avatarOpt)}
                  className="px-4 py-2 cursor-pointer text-base text-textColor hover:text-headingColor duration-200 transition-all ease-in-out hover:bg-slate-100"
                >
                  Services
                </li>
              </ul>
              <p
                onClick={logoutNow}
                className="m-2 p-2 flex items-center justify-center gap-3 cursor-pointer bg-gray-300 rounded-md hover:bg-slate-200 transition-all duration-300 ease-in text-textColor text-base"
              >
                Logout <LogoutIcon />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
