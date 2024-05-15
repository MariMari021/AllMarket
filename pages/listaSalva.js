
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';


export function ListaSalva({ }) {
  

    return (
        <View style={styles.container}>
          
                <Text onPress={() => navigation.navigate('Home')}>Voltar</Text>
        </View>
    );
}
