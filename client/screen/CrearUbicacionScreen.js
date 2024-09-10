import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CrearUbicacionScreen = () => {
    const [bodega, setBodega] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [altura, setAltura] = useState('');
    const [maxUnidades, setMaxUnidades] = useState('');
    const [flagExt, setFlagExt] = useState('');
    const [orden, setOrden] = useState('');
    const navigation = useNavigation();

    // Validar y enviar los datos a la API
    const handleCreate = async () => {
        if (!bodega || !ubicacion || !altura || !maxUnidades || !flagExt || !orden) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
    
        try {
            await axios.post('http://192.168.1.153:3000/api/ubicaciones', {
                INVBODEGA: bodega,
                INVUBICA: ubicacion,
                INVALTURA: parseFloat(altura),
                INVMAXUNID: parseFloat(maxUnidades),
                INVFLAGEXT: flagExt,
                INVORDEN: orden,
            });
    
            Alert.alert('Éxito', 'Ubicación creada correctamente');
            navigation.navigate('Home');  // Regresa a la pantalla Home (UbicacionesScreen)
        } catch (error) {
            console.error('Error al crear la ubicación:', error);
            Alert.alert('Error', 'No se pudo crear la ubicación');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Bodega:</Text>
            <TextInput
                style={styles.input}
                value={bodega}
                onChangeText={setBodega}
                placeholder="Ingrese la bodega"
            />

            <Text style={styles.label}>Ubicación:</Text>
            <TextInput
                style={styles.input}
                value={ubicacion}
                onChangeText={setUbicacion}
                placeholder="Ingrese la ubicación"
            />

            <Text style={styles.label}>Altura:</Text>
            <TextInput
                style={styles.input}
                value={altura}
                onChangeText={setAltura}
                placeholder="Ingrese la altura"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Máx. Unidades:</Text>
            <TextInput
                style={styles.input}
                value={maxUnidades}
                onChangeText={setMaxUnidades}
                placeholder="Ingrese las unidades máximas"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Flag Ext:</Text>
            <TextInput
                style={styles.input}
                value={flagExt}
                onChangeText={setFlagExt}
                placeholder="Ingrese el flag ext"
            />

            <Text style={styles.label}>Orden:</Text>
            <TextInput
                style={styles.input}
                value={orden}
                onChangeText={setOrden}
                placeholder="Ingrese el orden"
            />

            <Button title="Crear" onPress={handleCreate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default CrearUbicacionScreen;
