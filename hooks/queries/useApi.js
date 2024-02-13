
import {BASE_API_URL} from '@/app/app.config';
import {useState} from 'react';

export const useApi = (method, url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        throw new Error('Error making API call');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [data, isLoading, error, clearError, callApi];
};
