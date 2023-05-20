import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import axios from 'axios';

// Accessing environment variables
const apiUrl = REACT_APP_API_URL;

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');

  const navigation = useNavigation();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErr('');
    setMsg('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setErr('');
    setMsg('');
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErr('Please fill all fields.');
        return;
      }
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });
      console.log('Login successful:', response.data);

      // save access token and navigate to the next screen
      if (response.data) {
        // a better solution is to use State Management to save the access token
        localStorage.setItem('accessToken', String(response.data.accessToken));
        navigation.navigate('TodoList');
      }
    } catch (error: any) {
      console.error('Login failed:', error.response.data);
      // Display the error message
      setErr(error.response.data.error);
    }
  };

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        setErr('Please fill all fields.');
        return;
      }
      const response = await axios.post(`${apiUrl}/register`, {
        email,
        password,
      });
      console.log('Registration successful:', response.data);

      if (response.data) {
        setMsg('Registration successful. You can login now')
      }
    } catch (error: any) {
      console.error('Registration failed:', error.response.data);
      // Display the error message
      setErr(error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      {err ? <Text style={styles.errorText}>{err}</Text> : null}

      {msg ? <Text style={styles.msgText}>{msg}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  msgText: {
    color: 'green',
    marginBottom: 10,
  },
});

export default AuthScreen;
