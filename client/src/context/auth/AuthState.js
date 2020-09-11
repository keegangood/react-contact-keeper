import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  SET_ALERT,
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = () => console.log('Load user');

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post('/api/users', formData, config);

      console.log(`response: ${response}`);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`error: ${error} `);
      console.log(`msg: ${error.response.data.msg}`);

      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg,
      });
    }
  };

  // Login User
  const login = () => console.log('login user');

  // Logout
  const logout = () => console.log('logout user');

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
