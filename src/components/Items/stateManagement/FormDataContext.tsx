/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// FormDataContext.js
import React, { createContext, useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const FormDataContext = createContext<any>(null);

export const useFormData = () => useContext(FormDataContext);

export const FormDataProvider = ({ children }: any) => {  
  const [itemDetails, setItemDetails] = useState({
    itemName: "",
    amount: "",
    offerPrice: "",
    cuponCode: "",
    description: "",
    spiceLevel: "",
    isSpecial: false,
    is_veg: false,
    mongoId: "",
  });
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);
  const [expiredOn, setExpiredOn] = React.useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [indexedImage, setIndexedImage] = useState(0);
  const [fileSrc, setFileSrc] = useState(
    "../../assets/img/dummy-post-horisontal.jpg"
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const updateMenuItems = (newMenuItems: any) => {
    setMenuItems(newMenuItems);
  };
  return (
    <FormDataContext.Provider
      value={{
        itemDetails,
        setItemDetails,
        open,
        setOpen,
        indexedImage,
        setIndexedImage,
        fileSrc,
        setFileSrc,
        isPopupOpen,
        setIsPopupOpen,
        expiredOn,
        setExpiredOn,
        menuItems,
        setMenuItems,
        updateMenuItems
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
