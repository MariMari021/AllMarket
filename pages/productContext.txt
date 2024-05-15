import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);

    return (
        <ProductContext.Provider value={{ produtosAdicionados, setProdutosAdicionados }}>
            {children}
        </ProductContext.Provider>
    );
};
