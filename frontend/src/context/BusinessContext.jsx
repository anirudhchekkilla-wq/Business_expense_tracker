import { createContext, useState } from "react";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {

  const [selectedBusiness, setSelectedBusiness] = useState(
    JSON.parse(localStorage.getItem("selectedBusiness")) || null
  );

  const selectBusiness = (business) => {

    setSelectedBusiness(business);

    localStorage.setItem(
      "selectedBusiness",
      JSON.stringify(business)
    );

  };

  return (
    <BusinessContext.Provider
      value={{
        selectedBusiness,
        selectBusiness
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};