import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/userSlice";
import { populateItem } from "./features/foodItemSlice";

function App() {
  const dispatch = useDispatch();
  const [food, setFood] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) return;
      const { providerData } = userAuth;
      dispatch(
        login({
          userData: providerData[0],
        })
      );
    });
  }, []);

  useEffect(() => {
    db.collection("foodItems")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFood(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
  }, []);

  dispatch(populateItem(food));

  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-[112px] w-screen h-auto p-4 md:px-12 md:py-4">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
