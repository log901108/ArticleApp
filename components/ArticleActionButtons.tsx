import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {RootStackNavigationProp} from '../screens/types';

export interface ArticleActionButtonProps {
  articleId: number;
}

function ArticleActionButton({articleId}: ArticleActionButtonProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onPressModify = () => {
    navigation.navigate('Write', {articleId});
  };
  const onPressRemove = () => {};
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={onPressModify}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
      <View style={styles.separator} />
      <Pressable
        style={({pressed}) => pressed && styles.pressed}
        onPress={onPressRemove}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: -16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    color: '#2196f3',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default ArticleActionButton;
