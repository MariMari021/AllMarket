import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const initializeAnonymousUser = async () => {
    let anonymousId = await AsyncStorage.getItem('anonymousId');
    if (!anonymousId) {
      anonymousId = `anonymous-${Date.now()}`;
      await AsyncStorage.setItem('anonymousId', anonymousId);
    }
    setUserId(anonymousId);
    setIsAnonymous(true);
  };

  const initializeUser = async () => {
    const savedEmail = await AsyncStorage.getItem('user_email');
    if (savedEmail) {
      setUserId(savedEmail);
      setIsAnonymous(false);
    } else {
      await initializeAnonymousUser();
    }
  };

  useEffect(() => {
    if (!userId) {
      initializeUser();
    }
  }, [userId]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user_email');
      await AsyncStorage.removeItem('anonymousId');
      setUserId(null);
      setIsAnonymous(true);
      await initializeAnonymousUser();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, isAnonymous, setIsAnonymous, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
