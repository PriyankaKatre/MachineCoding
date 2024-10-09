import { useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
    const data = useFetch("https://dummyjson.com/products").apiResponse;
    const [page, setPage] = useState(1);

    const handleSelectedPage = (selectedPage) => {
        if (
          selectedPage >= 1 &&
          selectedPage <= data?.products.length/10 &&
          selectedPage !== page
        ) {
          setPage(selectedPage);
        }
    }

    if (!data?.products) {
        return null
    }

    return (
      <>
        <div className="products">
          {data &&
            data?.products.length > 0 &&
            data?.products.slice(page * 10 - 10, page * 10).map((prod) => {
              return (
                <span className="products__single" key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              );
            })}

          {data?.products && (
            <div className="pagination">
              <span onClick={() => handleSelectedPage(page- 1)}>⏮️</span>
              {[...Array(data?.products.length / 10)].map((_, i) => {
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
          )}
        </div>
      </>
    );
}

export default App;
