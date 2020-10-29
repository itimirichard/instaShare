import { useEffect } from 'react';
import useRequest from '../hooks/use-request';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

const Signout = () => {
  const history = useHistory();
  const { clearToken } = useAuth();
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {
      clearToken();
      history.push('/signin');
    },
  });

  useEffect(() => {
    doRequest().then(() => console.log('logged out '));
  }, [doRequest]);

  return <div>Signing you out</div>;
};

export default Signout;
