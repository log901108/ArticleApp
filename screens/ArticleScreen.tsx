import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';
import {getArticle} from '../api/articles';
import {getComments} from '../api/comments';
import {RootStackParamList} from './types';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  return (
    <View>
      <Text>{articleQuery.data.title}</Text>
      <Text>{articleQuery.data.body}</Text>
      <Text>{commentsQuery.data.length} of comments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticleScreen;
