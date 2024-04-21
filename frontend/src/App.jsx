import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import CustomReactQuery from "./CustomReactQuery";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [search, setSearch] = useState("");
  const [Products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        //Comment below setloading to check race condition handling
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();

    //cleanup funtion
    return () => {
      controller.abort();
    };
  }, [search]);
  // const [Products, error, loading] = CustomReactQuery(
  //   "/api/products?search=" + search
  // );

  if (error) {
    return <h1>Something Went Wrong!</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1>Api Call Demo</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Numbers of Products : {Products.length}</h2>
    </>
  );
}

export default App;
