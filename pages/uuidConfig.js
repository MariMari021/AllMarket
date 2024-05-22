import 'react-native-get-random-values'; // Importe a biblioteca para fornecer suporte para getRandomValues
import { v4 as uuidv4, v4 } from 'uuid';

// Verifique se global.crypto.getRandomValues está disponível
if (typeof global.crypto === 'undefined' || !global.crypto.getRandomValues) {
  global.crypto = {
    getRandomValues: (arr) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
    }
  };
}

export default uuidv4;
