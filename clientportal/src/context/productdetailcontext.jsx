import React, { createContext, useContext, useState } from "react";

// Create the ProductContext
const ProductContext = createContext();

// Provider component to wrap your app and provide context
export const ProductProvider = ({ children }) => {
  const [pdetail, setPdetail] = useState(false);
  const [sizedetail, setSizedetail] = useState('');
  const [pricedetail, setPricedetail] = useState('');
  const [categorydetail, setCategorydetail] = useState('');
  const [imgdetail, setImgdetail] = useState('');
  const [namedetail, setNamedetail] = useState('');
  const [descriptiondetail, setDescriptiondetail] = useState('');
  const [stockdetail, setStockdetail] = useState('');

  // Function to update product details
  const updateProductDetails = (product) => {
    setPdetail(true);
    setSizedetail(product.size);
    setPricedetail(product.price);
    setCategorydetail(product.category);
    setImgdetail(product.img);
    setNamedetail(product.name);
    setDescriptiondetail(product.description);
    setStockdetail(product.stock);
  };
  
  return (
    <ProductContext.Provider
      value={{
        setPdetail,
        pdetail,
        sizedetail,
        pricedetail,
        categorydetail,
        imgdetail,
        namedetail,
        descriptiondetail,
        stockdetail,
        updateProductDetails, // Expose the update function
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);
