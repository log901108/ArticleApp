import {RouteProp, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {getArticle} from '../api/articles';
import {getComments, deleteComment} from '../api/comments';
import {RootStackParamList} from './types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ArticleView from '../components/ArticleView';
import CommentItem from '../components/CommentItem';
import {useUserState} from '../contexts/UserContext';
import CommentInput from '../components/CommentInput';
import AskDialog from '../components/AskDialog';
import {Comment} from '../api/types';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

function ArticleScreen() {
  const queryClient = useQueryClient();

  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [askRemoveComment, setAskRemoveComment] = useState(false);

  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });

  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };
  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({
      id: selectedCommentId!,
      articleId: id,
    });
  };

  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };

  const onModify = (commentId: number) => {
    console.log(commentId);
  };

  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;
  const [currentUser] = useUserState();

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  const {bottom} = useSafeAreaInsets();

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator size="large" style={styles.spinner} color="black" />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;
  const isMyArticle = currentUser?.id === user.id;

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            publishedAt={item.published_at}
            username={item.user.username}
            onRemove={onRemove}
            onModify={onModify}
            isMyComment={item.user.id === currentUser?.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              body={body}
              publishedAt={published_at}
              username={user.username}
              id={id}
              isMyArticle={isMyArticle}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
      <AskDialog
        visible={askRemoveComment}
        title="Remove Comment"
        message="Are you sure you want to remove this comment?"
        isDestructive
        confirmText="Delete"
        onConfirm={onConfirmRemove}
        onClose={onCancelRemove}
      />
    </>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});

export default ArticleScreen;
