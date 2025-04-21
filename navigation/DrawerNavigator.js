import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CadUserScreen from '../screens/CadUserScreen';
import ConsUserScreen from '../screens/ConsUserScreen';
import CadProdudo from '../screens/CadProdudo';
import ConsProdutoScreen from '../screens/ConsProdutoScreen';

const Drawer = createDrawerNavigator();
//rotas do drawer
export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Cadastrar Usuario" component={CadUserScreen} />
            <Drawer.Screen name="Consultar Usuario" component={ConsUserScreen} />
            <Drawer.Screen name="Cadastrar Produto" component={CadProdudo} />
            <Drawer.Screen name="Consultar Produto" component={ConsProdutoScreen} />
        </Drawer.Navigator>
    );
}
