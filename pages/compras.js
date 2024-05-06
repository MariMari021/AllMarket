import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export function Compras() {

    useFonts({ 'Inter': require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf') });
  
    return (
    <View style={styles.container}>
      <Text style={styles.Texto}>Compras!Giovanna</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Texto:{
    fontFamily:'Inter',
    fontWeight:"800"
  }
});
