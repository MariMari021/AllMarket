import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export function Compras() {
  return (
    <View style={styles.container}>
      <Text>Compras!Giovanna</Text>
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
});
