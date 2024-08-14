'use client';

import React, {useState, useEffect, createContext} from 'react';
import PropTypes from 'prop-types';

const STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const AlertContext = createContext({
  alert: null,
  text: null,
  success: () => {},
  error: () => {},
});

const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null);
  const [text, setText] = useState(null);
  const [timer, setTimer] = useState(null);

  // Clear the alert after a specified time
  const clearAlertWithTimer = (duration = 5000) => {
    clearTimeout(timer); // Clear any existing timer
    const newTimer = setTimeout(() => {
      clear();
    }, duration);
    setTimer(newTimer);
  };

  const success = (text) => {
    setText(text);
    setAlert(STATES.SUCCESS);
    clearAlertWithTimer();
  };

  const error = (text) => {
    setText(text);
    setAlert(STATES.ERROR);
    clearAlertWithTimer();
  };

  const clear = () => {
    setText(null);
    setAlert(null);
    clearTimeout(timer);
  };

  // Cleanup timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => clearTimeout(timer);
  }, [timer]);

  return (
    <AlertContext.Provider value={{success, error, clear, alert, text}}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node,
};

export {AlertProvider};
export default AlertContext;
