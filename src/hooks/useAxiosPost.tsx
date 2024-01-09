import { useState } from 'react';
import axios from 'axios';

export function useAxiosPost(url: string) {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const postData = async (requestData: any) => {
      setLoading(true);
      try {
        const response = await axios.post(url, requestData);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro na requisição à API:', error);
        setError('Ocorreu um erro ao fazer a requisição.');
        setLoading(false);
      }
    };
  
    return { data, loading, error, postData };
  }