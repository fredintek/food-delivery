import React, { useState } from "react";
import { motion } from "framer-motion";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { categoriesData } from "../../srcUtils/data";
import Loader from "../Loader";
import { db, storage } from "../../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import firebase from "firebase/compat/app";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearFields = () => {
    setTitle("");
    setCalories("");
    setPrice("");
    setCategory(null);
    setImageAsset(null);
  };

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading: Try again ");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        setImageAsset(downloadUrl);
        setIsLoading(false);
        setFields(true);
        setMsg("Image Uploaded Successfully 😁");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    );
  };

  const deleteImage = async () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    await deleteObject(deleteRef);
    setImageAsset(null);
    setIsLoading(false);
    setFields(true);
    setMsg("Image Deleted Successfully");
    setAlertStatus("success");
    setTimeout(() => {
      setFields(false);
    }, 4000);
  };

  const saveDetails = async () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required fields cannot be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);

        return;
      }

      const formData = {
        id: `${Date.now()}`,
        title: title,
        imageURL: imageAsset,
        category: category,
        calories: calories,
        qty: 1,
        price: price,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection("foodItems").add(formData);
      setIsLoading(false);
      setFields(true);
      setMsg("Items Added Successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);

      clearFields();
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg("Error while uploading: Try again ");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  return (
    <div className="w-full h-auto flex min-h-screen items-center justify-center">
      <div className="w-[90%] md:w-[75%] border-2 border-gray-400 p-4 rounded-md flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-4 rounded-lg text-center text-lg font-bold ${
              alertStatus === "danger"
                ? "bg-red-500 text-red-800"
                : "bg-emerald-500 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <FastfoodIcon className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title"
            className="w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-300"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="text-base w-full border-b border-gray-300 rounded-md p-2 cursor-pointer"
          >
            <option className="bg-white" value="other">
              Select Category
            </option>
            {categoriesData &&
              categoriesData.map((category) => (
                <option
                  key={category.id}
                  value={category.urlParamName}
                  className="text-base border-0 capitalize bg-white text-headingColor"
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label
                    for="imageUpload"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                      <CloudUploadIcon className="text-gray-500 text-6xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      onChange={uploadImage}
                      className="w-0 h-0"
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      className="w-full h-[50%] object-cover"
                      src={imageAsset}
                      alt="uploaded image"
                    />
                    <motion.button
                      whileTap={{ scale: 0.6 }}
                      onClick={deleteImage}
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer hover:shadow-md duration-300 transition-all ease-in-out"
                      type="button"
                    >
                      <DeleteIcon />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <FoodBankIcon className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent border-none placeholder:text-gray-400 font-semibold text-textColor"
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <AttachMoneyIcon className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent border-none placeholder:text-gray-400 font-semibold text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            onClick={saveDetails}
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none bg-emerald-500 px-12 py-2 text-lg text-white rounded-lg font-semibold"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
