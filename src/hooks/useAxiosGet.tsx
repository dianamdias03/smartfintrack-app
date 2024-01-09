import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function useAxiosGet(url: string) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro na requisição à API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {data, loading};
}