import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './routes';
import { UserProvider } from './pages/UserContext';

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
