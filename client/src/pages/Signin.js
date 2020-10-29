import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import useRequest from '../hooks/use-request';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { saveToken } = useAuth();
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => {
      saveToken(data.token);
      history.push('/upload');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className='row justify-content-center align-middle'>
      <div className='col-12 col-sm-6 col-md-3'>
        <form className='form-container' onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control'
              id='username'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors}
          <button type='submit' className='btn btn-primary btn-block'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
