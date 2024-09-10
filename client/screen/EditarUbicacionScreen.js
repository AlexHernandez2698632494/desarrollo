import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditarUbicacionScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { bodega } = route.params;

    // Estado para los campos del formulario
    const [invBodega, setInvBodega] = useState(bodega.INVBODEGA);
    const [invUbica, setInvUbica] = useState(bodega.INVUBICA);
    const [invAltura, setInvAltura] = useState(bodega.INVALTURA.toString());
    const [invMaxUnid, setInvMaxUnid] = useState(bodega.INVMAXUNID.toString());
    const [invFlagExt, setInvFlagExt] = useState(bodega.INVFLAGEXT);
    const [invOrden, setInvOrden] = useState(bodega.INVORDEN);

    // Maneja el guardado de la ubicación actualizada
    const handleSave = async () => {
        try {
            await axios.put(`http://192.168.1.153:3000/api/ubicaciones/${invBodega}/${invUbica}`, {
                INVALTURA: parseFloat(invAltura),
                INVMAXUNID: parseFloat(invMaxUnid),
                INVFLAGEXT: invFlagExt,
                INVORDEN: invOrden,
            });

            Alert.alert('Éxito', 'La ubicación ha sido actualizada');
            navigation.navigate('Home'); // Regresa a la pantalla principal
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo actualizar la ubicación');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={invBodega}
                editable={false}  // No permitimos editar la bodega
                placeholder="Bodega"
            />
            <TextInput
                style={styles.input}
                value={invUbica}
                editable={false}  // No permitimos editar la ubicación
                placeholder="Ubicación"
            />
            <TextInput
                style={styles.input}
                value={invAltura}
                onChangeText={setInvAltura}
                placeholder="Altura"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={invMaxUnid}
                onChangeText={setInvMaxUnid}
                placeholder="Máx. Unidades"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={invFlagExt}
                onChangeText={setInvFlagExt}
                placeholder="Flag Ext"
            />
            <TextInput
                style={styles.input}
                value={invOrden}
                onChangeText={setInvOrden}
                placeholder="Orden"
            />
            <Button title="Guardar" onPress={handleSave} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default EditarUbicacionScreen;
