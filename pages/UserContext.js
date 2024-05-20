import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [produtosAdicionados, setProdutosAdicionados] = useState([]);

  useEffect(() => {
    const initializeAnonymousUser = async () => {
      let anonymousId = await AsyncStorage.getItem('anonymousId');
      if (!anonymousId) {
        anonymousId = uuidv4();
        await AsyncStorage.setItem('anonymousId', anonymousId);
      }
      setUserId(anonymousId);
    };

    if (!userId) {
      initializeAnonymousUser();
    }
  }, [userId]);

  const logout = async () => {
    setUserId(null);
    setIsAnonymous(true);
    // Limpar produtos adicionados ao fazer logout
    setProdutosAdicionados([]);
    // Salvar os produtos após limpar
    await saveProdutos([], userId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, isAnonymous, setIsAnonymous, logout, produtosAdicionados, setProdutosAdicionados }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
