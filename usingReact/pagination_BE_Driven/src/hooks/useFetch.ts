import { useEffect, useState } from "react"

const useFetch = (apiUrl) => {
    const [data, setData] = useState();
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.products) {
          setData(data);
          setTotalPages(Math.ceil(data.total/10));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      if (apiUrl) fetchData();
    }, [apiUrl]);
    return { data, totalPages };

}

export default useFetch
