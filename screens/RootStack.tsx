import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import MainTab from './MainTab';
import ArticleScreen from './ArticleScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MyArticlesScreen from './MyArticlesScreen';
import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import WriteScreen from './WriteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  useAuthLoadEffect();

  return (
    <Stack.Navigator screenOptions={{headerBackTitle: 'exit'}}>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Sign Up'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Sign In'}}
      />
      <Stack.Screen
        name="MyArticles"
        component={MyArticlesScreen}
        options={{title: 'My Articles'}}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{title: 'Articles'}}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{title: 'Commit New Article'}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
