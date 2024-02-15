'use client';

import React, {useState, useEffect, createContext} from 'react';
import PropTypes from 'prop-types';
import {useApi} from '@/hooks/queries/useApi';

const UserContext = createContext(null);

// TODO: useRouter()
const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, clearError, callApi] = useApi('GET', 'user');

  useEffect(() => {
    callApi(); // Call the API to get user info
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data); // Set the user data if fetched successfully
    }
  }, [data]);

  if (error) {
    window.location.href = '/login'; // Redirect to login page if not authenticated
  }

  return (
    <UserContext.Provider value={{user, isLoading}}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UserProvider};
export default UserContext;
