import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListasContext = createContext();

export const ListasProvider = ({ children }) => {
  const [listasSalvas, setListasSalvas] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);

  const saveListas = async (listas, userId) => {
    try {
      await AsyncStorage.setItem(`listas_${userId}`, JSON.stringify(listas));
      setListasSalvas(listas);
    } catch (error) {
      console.error('Erro ao salvar listas:', error);
    }
  };

  const saveProdutos = async (produtos, userId) => {
    try {
      await AsyncStorage.setItem(`produtos_${userId}`, JSON.stringify(produtos));
      setTotalProdutos(produtos.length);
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    }
  };

  const logout = async (userId) => {
    try {
      console.log('Logging out from ListasContext...');
      await saveProdutos([], userId); // Clear products
      await saveListas([], userId); // Clear lists
      setListasSalvas([]);
      setTotalProdutos(0);
      console.log('Logged out from ListasContext successfully');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ListasContext.Provider value={{ listasSalvas, setListasSalvas, saveListas, saveProdutos, totalProdutos, logout }}>
      {children}
    </ListasContext.Provider>
  );
};

export const useListas = () => useContext(ListasContext);
