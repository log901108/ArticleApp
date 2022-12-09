import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';
import ArticlesScreen from './ArticlesScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Articles"
        component={ArticlesScreen}
        options={{
          title: 'Article Contents',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
