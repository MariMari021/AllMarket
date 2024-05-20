// uuidConfig.js

import 'react-native-get-random-values'; // Importe a biblioteca para fornecer suporte para getRandomValues
import { v4 as uuidv4 } from 'uuid';

if (typeof global.crypto === 'undefined' || !global.crypto.getRandomValues) {
  uuidv4.options = {
    rng: () => {
      const rnds = new Array(16);
      for (let i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        rnds[i] = (r >>> ((i & 0x03) << 3)) & 0xff;
      }
      return rnds;
    },
  };
}
export default uuidv4;