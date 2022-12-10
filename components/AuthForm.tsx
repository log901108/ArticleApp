import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

export interface AuthFormProps {
  isRegister?: boolean;
}

function AuthForm({isRegister}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      <View style={styles.block}>
        <View>
          {isRegister ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="email or username"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            style={({pressed}) => [
              styles.submit,
              Platform.OS === 'ios' && pressed && styles.submitPressed,
            ]}
            android_ripple={{color: '#42a5f5'}}>
            <Text style={styles.submitText}>
              {isRegister ? 'SignUp' : 'SignIn'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#dddddd',
    borderWidth: 1,
    marginBottom: 8,
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#2196f3',
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitPressed: {
    opacity: 0.75,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AuthForm;
