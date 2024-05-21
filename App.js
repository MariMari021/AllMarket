import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './routes';
import { UserProvider } from './pages/UserContext';
import { ListasProvider } from './pages/ListasContext'; // Importe o ListasProvider

const App = () => {
  return (
    <UserProvider>
      <ListasProvider> 
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ListasProvider>
    </UserProvider>
  );
};

export default App;
