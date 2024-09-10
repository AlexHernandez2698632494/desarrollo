// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegister = async () => {
    if (!nombre || !apellido || !correo || !usuario || !contraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.153:3000/auth/usuarios/', {
        Nombre: nombre,
        Apellido: apellido,
        Correo: correo,
        Usuario: usuario,
        Contraseña: contraseña
      });

      if (response.status === 201) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        // Aquí puedes navegar a otra pantalla o limpiar el formulario
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Error', 'El correo o usuario ya existe');
      } else {
        Alert.alert('Error', 'Error al registrar el usuario');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
      />
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        style={styles.input}
        secureTextEntry
      />

      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  }
});

export default RegisterScreen;
