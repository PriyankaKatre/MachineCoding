import { useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const [page, setPage] = useState(1);
  const { data, totalPages, loading, error } = useFetch(
    `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
  );

  const handleSelectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div>Error:{ error}</div>
    }

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="products">
        {data?.products.map((prod) => {
          return (
            <span className="products__single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          );
        })}
      </div>
      <div>
        <div className="pagination">
          <span onClick={() => handleSelectedPage(page - 1)}>⏮️</span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handleSelectedPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span onClick={() => handleSelectedPage(page + 1)}>⏭️</span>
        </div>
      </div>
    </>
  );
}

export default App;
