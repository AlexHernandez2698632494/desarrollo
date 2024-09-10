import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const UbicacionesScreen = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const navigation = useNavigation();

    // Función para obtener las ubicaciones de la API
    const fetchUbicaciones = async () => {
        try {
            const response = await axios.get('http://192.168.1.153:3000/api/ubicaciones');
            setUbicaciones(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    // useFocusEffect se ejecuta cada vez que la pantalla vuelve a enfocarse
    useFocusEffect(
        useCallback(() => {
            fetchUbicaciones(); // Refresca la lista cuando la pantalla esté enfocada
        }, [])
    );

    // Función para navegar a la pantalla de creación
    const handleCreate = () => {
        navigation.navigate('CrearUbicacion');  // Navega a la pantalla de creación
    };

    // Función para eliminar una ubicación
    const handleDelete = (bodega) => {
        Alert.alert(
            'Eliminar',
            `¿Estás seguro de que deseas eliminar la bodega ${bodega.INVBODEGA}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: () => deleteUbicacion(bodega.INVBODEGA, bodega.INVUBICA),
                    style: 'destructive',
                },
            ]
        );
    };

    // Función para eliminar la ubicación desde la API
    const deleteUbicacion = async (INVBODEGA, INVUBICA) => {
        try {
            await axios.delete(`http://192.168.1.153:3000/api/ubicaciones/${INVBODEGA}/${INVUBICA}`);
            // Filtra la bodega eliminada de la lista de ubicaciones
            const updatedUbicaciones = ubicaciones.filter(
                (item) => item.INVBODEGA !== INVBODEGA || item.INVUBICA !== INVUBICA
            );
            setUbicaciones(updatedUbicaciones);
            Alert.alert('Éxito', 'La bodega ha sido eliminada');
        } catch (error) {
            console.error('Error al eliminar la bodega:', error);
            Alert.alert('Error', 'No se pudo eliminar la bodega');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Crear nueva ubicación" onPress={handleCreate} />

            <FlatList
                data={ubicaciones}
                keyExtractor={(item) => item.INVBODEGA + item.INVUBICA}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>Bodega: {item.INVBODEGA}</Text>
                        <Text>Ubicación: {item.INVUBICA}</Text>

                        <View style={styles.buttons}>
                            <Button title="Ver" onPress={() => navigation.navigate('BodegaDetails', { INVBODEGA: item.INVBODEGA, INVUBICA: item.INVUBICA })} />
                            <Button title="Editar" onPress={() => navigation.navigate('EditarUbicacion', { bodega: item })} />
                            <Button title="Eliminar" color="red" onPress={() => handleDelete(item)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    item: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});

export default UbicacionesScreen;
