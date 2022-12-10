import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MenuItem from '../components/MenuItem';
import {RootStackNavigationProp} from './types';
import {clearToken} from '../api/client';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [user, setUSer] = useUserState();
  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUSer(null);
    clearToken();
    authStorage.clear();
  };

  return (
    <View>
      {user ? (
        <MenuItem name="SignOut" onPress={onLogout} />
      ) : (
        <>
          <MenuItem name="SignIn" onPress={onLogin} />
          <MenuItem name="SignUp" onPress={onRegister} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
