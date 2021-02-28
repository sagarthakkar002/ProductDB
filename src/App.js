import React, { useEffect, useState } from "react";
import Table from "./components/Table";

const fetchAPI = "https://lpcontent.s3.ap-south-1.amazonaws.com/Test/API.json";

const App = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function getProductData() {
      try {
        let response = await fetch(fetchAPI);
        let productData = await response.json();
        setProductData(productData.config);
      } catch (err) {
        console.error(err);
      }
    }
    getProductData();
  }, []);

  return (
    <div className="App">
      {productData.length > 0 && <Table productData={productData} />}
    </div>
  );
};

export default App;
