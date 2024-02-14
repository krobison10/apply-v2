import {useContext} from 'react';
import AlertContext from '@/context/alertContext';

function useAlert() {
  const alert = useContext(AlertContext);

  return alert;
};

export default useAlert;
