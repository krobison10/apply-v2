import {useState, useEffect} from 'react';

export default function useSearchParam() {
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTerm(urlParams.get('search') || '');
  }, []);
  return searchTerm;
}
