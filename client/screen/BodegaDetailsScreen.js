import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const BodegaDetailsScreen = ({ route }) => {
    const { INVBODEGA, INVUBICA } = route.params; // Recibimos los parámetros desde la navegación
    const [bodegaDetails, setBodegaDetails] = useState(null);

    useEffect(() => {
        const fetchBodegaDetails = async () => {
            try {
                const response = await axios.get(`http://192.168.1.153:3000/api/ubicaciones/${INVBODEGA}/${INVUBICA}`);
                setBodegaDetails(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles de la bodega", error);
            }
        };

        fetchBodegaDetails();
    }, [INVBODEGA, INVUBICA]);

    if (!bodegaDetails) {
        return (
            <View style={styles.container}>
                <Text>Cargando detalles...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles de la Bodega</Text>
            <Text>Bodega: {bodegaDetails.INVBODEGA}</Text>
            <Text>Ubicación: {bodegaDetails.INVUBICA}</Text>
            <Text>Altura: {bodegaDetails.INVALTURA}</Text>
            <Text>Máx. Unidades: {bodegaDetails.INVMAXUNID}</Text>
            <Text>Flag Ext: {bodegaDetails.INVFLAGEXT}</Text>
            <Text>Orden: {bodegaDetails.INVORDEN}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 }
});

export default BodegaDetailsScreen;
