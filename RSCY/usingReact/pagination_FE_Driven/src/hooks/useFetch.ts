import { useEffect, useState } from "react"

const useFetch = (apiUrl) => {
    const [apiResponse, setApiResponse] = useState();

    const fetchData = async() => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          data && setApiResponse(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if (apiUrl) fetchData();
    }, [apiUrl]);
    return { apiResponse };

}

export default useFetch
