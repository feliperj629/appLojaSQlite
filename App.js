import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';

// Importação do banco de dados
import { initDB } from './db/dbUsuarios';
import { initDBProdutos } from './db/dbProdutos';

export default function App() {
  // Inicialização do banco de dados
  useEffect(() => {
    initDB();
    initDBProdutos();
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
