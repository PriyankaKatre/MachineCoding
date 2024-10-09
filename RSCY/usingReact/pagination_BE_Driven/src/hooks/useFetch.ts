import { useEffect, useState, useCallback } from "react";
import ApiResponse from './../modal/product';


const useFetch = (apiUrl: ApiResponse) => {
  const [data, setData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data && data.products) {
        setData(data);
        setTotalPages(Math.ceil(data.total / 10));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (apiUrl) fetchData();
  }, [apiUrl]);
  return { data, totalPages, loading, error };
};

export default useFetch;
