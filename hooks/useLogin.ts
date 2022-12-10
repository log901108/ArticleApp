import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {AuthError} from '../api/types'

export default function useLogin() {
  const mutation = useMutation(login, {
    onSuccess: data => {
      console.log(data);
    },
    onError: (error: AuthError) => {
      console.log(error);
    },
  });

  return mutation;
}
