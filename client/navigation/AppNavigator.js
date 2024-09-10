import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Button, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import UbicacionesScreen from "../screen/UbicacionesScreen";
import BodegaDetailsScreen from "../screen/BodegaDetailsScreen";
import CrearUbicacionScreen from "../screen/CrearUbicacionScreen";
import EditarUbicacionScreen from "../screen/EditarUbicacionScreen";
import PerfilScreen from "../screen/PerfilScreen"
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Pantalla Cerrar Sesión (Ejemplo básico)
const CerrarSesionScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Lógica de cierre de sesión (limpieza de token, redirección, etc.)
    navigation.replace("Login"); // Redirige a la pantalla de Login después de cerrar sesión
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

// Tab Navigator (Navegación inferior) que incluye las tres pestañas
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        // Dependiendo de la ruta, selecciona un icono
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Perfil") {
          iconName = focused ? "person" : "person-outline";
        } else if (route.name === "Cerrar Sesión") {
          iconName = focused ? "exit" : "exit-outline";
        }

        // Retorna el componente del icono
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'blue',  // Color del icono cuando está activo
      tabBarInactiveTintColor: 'gray',  // Color del icono cuando está inactivo
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={UbicacionesScreen} 
      options={{ title: "Home" }} 
    />
    <Tab.Screen 
      name="Perfil" 
      component={PerfilScreen} 
      options={{ title: "Perfil" }} 
    />
    <Tab.Screen 
      name="Cerrar Sesión" 
      component={CerrarSesionScreen} 
      options={{ title: "Cerrar Sesión" }} 
    />
  </Tab.Navigator>
);;

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantallas de autenticación */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Pantalla principal con TabNavigator después del Login */}
        <Stack.Screen
          name="Home"
          component={TabNavigator} // Aquí usamos el TabNavigator
          options={{
            headerShown: false, // Oculta el header cuando se muestran las tabs
          }}
        />

        {/* Otras pantallas */}
        <Stack.Screen name="BodegaDetails" component={BodegaDetailsScreen} />
        <Stack.Screen name="CrearUbicacion" component={CrearUbicacionScreen} />
        <Stack.Screen name="EditarUbicacion" component={EditarUbicacionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;