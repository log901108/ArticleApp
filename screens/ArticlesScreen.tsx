import React from 'react';
import {useQuery} from 'react-query';
import {getArticles} from '../api/articles';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Articles from '../components/Articles';

function ArticlesScreen() {
  const {data, isLoading} = useQuery('articles', getArticles);
  console.log({data, isLoading});

  if (!data) {
    return <ActivityIndicator size="large" style={styles.spinner} />;
  }

  return <Articles articles={data} />;
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});

export default ArticlesScreen;
