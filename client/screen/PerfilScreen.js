import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PerfilScreen = () => {
    const navigation = useNavigation();

    // Función para manejar "Mi cuenta"
    const handleMiCuenta = () => {
        // Navega a la pantalla de detalles de la cuenta (puedes crear una pantalla separada para esto)
        Alert.alert('Mi Cuenta', 'Aquí mostrarías la información de la cuenta');
    };

    // Función para manejar "Cambiar contraseña"
    const handleCambiarContrasena = () => {
        // Navega a la pantalla de cambio de contraseña (puedes crear una pantalla separada para esto)
        Alert.alert('Cambiar Contraseña', 'Aquí irías a la pantalla de cambiar contraseña');
    };

    // Función para cerrar sesión
    const handleCerrarSesion = () => {
        // Redirige a la pantalla de login y maneja el cierre de sesión
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    onPress: () => navigation.replace('Login'), // Redirige a la pantalla de login
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            <View style={styles.buttonContainer}>
                <Button title="Mi Cuenta" onPress={handleMiCuenta} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Cambiar Contraseña" onPress={handleCambiarContrasena} />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Cerrar Sesión" color="red" onPress={handleCerrarSesion} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        marginVertical: 10,
    },
});

export default PerfilScreen;
