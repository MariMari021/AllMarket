import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export function Compras() {
  const route = useRoute();
  const routeParams = route.params ?? {};
  const { ultimoValorLimite, categoriasComTotais } = routeParams;

  const [categoriaMenorValor, setCategoriaMenorValor] = useState(null);
  const [categoriaMaiorValor, setCategoriaMaiorValor] = useState(null);

  useEffect(() => {
    if (categoriasComTotais && categoriasComTotais.length > 0) {
      const categoriaMenor = categoriasComTotais.reduce((prev, curr) => {
        return parseFloat(curr.total) < parseFloat(prev.total) ? curr : prev;
      });
      setCategoriaMenorValor(categoriaMenor);

      const categoriaMaior = categoriasComTotais.reduce((prev, curr) => {
        return parseFloat(curr.total) > parseFloat(prev.total) ? curr : prev;
      });
      setCategoriaMaiorValor(categoriaMaior);
    }
  }, [categoriasComTotais]);

  const nenhumValorDefinido =
    !ultimoValorLimite &&
    (!categoriasComTotais || categoriasComTotais.length === 0) &&
    !categoriaMenorValor &&
    !categoriaMaiorValor;

  return (
    <ScrollView>
      <View>
        <Text>
          Verifique aqui {' '}
          <Text>qual é a melhor opção para você!</Text>
        </Text>
      </View>
      {nenhumValorDefinido ? (
        <Text>Nenhum valor foi definido</Text>
      ) : (
        <View>
          {ultimoValorLimite ? (
            <Text>Último valor limite: {ultimoValorLimite}</Text>
          ) : (
            <Text>Valor não definido</Text>
          )}
          <Text>Categorias com produtos adicionados:</Text>
          {categoriasComTotais && categoriasComTotais.length > 0 ? (
            categoriasComTotais.map(({ categoria, total }, index) => (
              <View key={index}>
                <Text>{categoria}:</Text>
                <Text>R${total}</Text>
              </View>
            ))
          ) : (
            <Text>Nenhum produto adicionado.</Text>
          )}
          {categoriaMenorValor ? (
            <Text>Categoria com menor valor: {categoriaMenorValor.categoria} com R${categoriaMenorValor.total}</Text>
          ) : (
            <Text>Nenhuma categoria com valor definido.</Text>
          )}
          {categoriaMaiorValor ? (
            <Text>Categoria com maior valor: {categoriaMaiorValor.categoria} com R${categoriaMaiorValor.total}</Text>
          ) : (
            <Text>Nenhuma categoria com valor definido.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
