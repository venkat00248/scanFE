/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// FormDataContext.js
import  { createContext, useContext, useState } from "react";

const TenantFormDataContext = createContext<any>(null);

export const useTenantFormData = () => useContext(TenantFormDataContext);

export const TenantFormDataProvider = ({ children}:any) => {
  const [tenantDetails, setTenantDetails] = useState({ tenantName: "", email: "" });
  const [themeDetails, setThemeDetails] = useState({ primaryColor: "#e66465", secondaryColor: "#f6b73c" });
  const [userDetails, setUserDetails] = useState({ name: "", email: "", contact: "" });
  const [location, setLocation] = useState({
    address: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
  });
const [checked, setChecked]= useState(false)
const [mongoId, setMongoId]= useState("")
const [fileSrc, setFileSrc] = useState("./assets/img/logo.jpg");
  return (
    <TenantFormDataContext.Provider
      value={{
        tenantDetails,
        mongoId,
        setMongoId,
        setTenantDetails,
        userDetails,
        setUserDetails,
        location,
        setLocation,
        checked,
        setChecked,
        themeDetails, setThemeDetails,
        fileSrc, setFileSrc
      }}
    >
      {children}
    </TenantFormDataContext.Provider>
  );
};
