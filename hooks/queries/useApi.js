
import {BASE_API_URL} from '@/app.config';
import {useState} from 'react';
import useAlert from '@/hooks/useAlert';

export const useApi = (method, url, noDialogErrorCodes = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const alert = useAlert();


  const clearError = () => {
    setError(null);
  };

  const callApi = async (body) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_API_URL}${url}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        setError(errorBody);
        const message = errorBody.error ? `${errorBody.error} - ${errorBody.message}` : 'An error occurred';
        if (!noDialogErrorCodes.includes(errorBody.code)) {
          alert.error('Error: ' + message);
        }
        return;
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError({message: error.message});
    } finally {
      setIsLoading(false);
    }
  };

  return [data, isLoading, error, clearError, callApi];
};
