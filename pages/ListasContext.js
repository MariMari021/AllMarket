import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';

const ListasContext = createContext();

export const ListasProvider = ({ children }) => {
  const { userId } = useUser();
  const [listasSalvas, setListasSalvas] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);

  useEffect(() => {
    const fetchListas = async () => {
      if (userId) {
        const listas = await loadListas(userId);
        setListasSalvas(listas);
      }
    };
    fetchListas();
  }, [userId]);

  useEffect(() => {
    const calculateTotalProdutos = () => {
      const total = listasSalvas.reduce((acc, lista) => acc + lista.produtos.length, 0);
      setTotalProdutos(total);
    };

    calculateTotalProdutos();
  }, [listasSalvas]);

  const loadListas = async (userId) => {
    try {
      const listasSalvasString = await AsyncStorage.getItem(`@listasSalvas_${userId}`);
      return listasSalvasString ? JSON.parse(listasSalvasString) : [];
    } catch (error) {
      console.error('Erro ao carregar as listas salvas:', error);
      return [];
    }
  };

  const saveListas = async (listas) => {
    try {
      const jsonValue = JSON.stringify(listas);
      await AsyncStorage.setItem(`@listasSalvas_${userId}`, jsonValue);
      setListasSalvas(listas);
    } catch (error) {
      console.error('Erro ao salvar as listas:', error);
    }
  };

  return (
    <ListasContext.Provider value={{ listasSalvas, setListasSalvas, saveListas, totalProdutos }}>
      {children}
    </ListasContext.Provider>
  );
};

export const useListas = () => {
  return useContext(ListasContext);
};
