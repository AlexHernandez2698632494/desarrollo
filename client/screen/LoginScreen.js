import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`http://192.168.1.153:3000/auth/usuarios/${data.identificador}/${data.password}`);
            if (response.status === 200) {
                navigation.navigate('Home', { user: response.data });
            }
        } catch (error) {
            alert('Usuario o contraseña incorrectos');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Controller
                control={control}
                name="identificador"
                render={({ field: { onChange, value } }) => (
                    <TextInput placeholder="Correo o Usuario" style={styles.input} onChangeText={onChange} value={value} />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={onChange} value={value} />
                )}
            />
            <Button title="Ingresar" onPress={handleSubmit(onSubmit)} />
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 10 }
});

export default LoginScreen;
