import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/auth';
import Header from './components/Header';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Signout from './pages/Signout';
import Upload from './pages/Upload';
import ShowFiles from './pages/ShowFiles';

const App = () => {
  const currentToken =
    localStorage.getItem('token') && JSON.parse(localStorage.getItem('token'));
  const [token, setToken] = useState(currentToken);

  const saveToken = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setToken(data);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, clearToken }}>
      <BrowserRouter>
        <div className='container'>
          <Header token={token} />
          <div className='main-content'>
            <Switch>
              <Route path='/signin' exact component={Signin} />
              <Route path='/signup' exact component={Signup} />
              <Route path='/signout' exact component={Signout} />
              <PrivateRoute path='/upload' exact component={Upload} />
              <PrivateRoute path='/files' exact component={ShowFiles} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
