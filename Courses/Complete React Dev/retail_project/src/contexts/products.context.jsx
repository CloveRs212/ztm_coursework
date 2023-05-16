import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from '../utils/firebase.utils';
import SHOP_DATA from '../shop-data.js';

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProdvider = ({children}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    addCollectionAndDocuments('catagories', SHOP_DATA);
  }, [])
  const value = {products};
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};