import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList";
import axios from "axios";
import { healthCheck } from "./api/api";
import { RecoilRoot } from "recoil";
import {  MovieBookingSteps } from "./MovieBookingSteps";

export const handleHealthCheck = () =>
  healthCheck().then((response) => {
    console.log(response);
  });

function App() {
  // const [step, setStep] = useState(0);

  const [products, setProduts] = useState([
    {
      productId: "uuid-1",
      productName: "콜롬비아 커피1",
      category: "커피빈",
      price: 5000,
    },
    {
      productId: "uuid-2",
      productName: "콜롬비아 커피2",
      category: "커피빈",
      price: 5000,
    },
    {
      productId: "uuid-3",
      productName: "콜롬비아 커피3",
      category: "커피빈",
      price: 5000,
    },
  ]);
 
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((v) => setProduts(v.data));
  }, []);


  return (
    <RecoilRoot>
      <div className="App">
        <div className="row justify-content-center m-4">
          <h1 className="text-center">영화 예매하기 </h1>
        </div>
        <MovieBookingSteps />
      </div>
    </RecoilRoot>
  );

  
}

export default App;


