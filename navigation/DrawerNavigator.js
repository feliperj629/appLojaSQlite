import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CadastroScreen from '../screens/CadastroScreen';
import DataScreen from '../screens/DataScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Cadastro" component={CadastroScreen} />
            <Drawer.Screen name="ListaDados" component={DataScreen} />
        </Drawer.Navigator>
    );
}
