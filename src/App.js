import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList";
import { Summary } from "./components/Summary";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { healthCheck } from "./api/api";
import { MovieList } from "./components/MovieList";

const queryClient = new QueryClient();

const handleHealthCheck = () =>
  healthCheck().then((response) => {
    console.log(response);
  });

function App() {
  const [step, setStep] = useState(0);
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
  const [items, setItems] = useState([]);
  const handleAddClicked = (productId) => {
    const found = items.find((v) => v.productId == productId);
    const product = products.find((v) => v.productId == productId);
    const updatedItems = found
      ? items.map((v) =>
          v.productId == productId
            ? {
                ...v,
                count: v.count + 1,
              }
            : v
        )
      : [...items, { ...product, count: 1 }];
    setItems(updatedItems);
    console.log(
      products.find((v) => v.productId == productId),
      "clicked!"
    );
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/products")
      .then((v) => setProduts(v.data));
  }, []);
  const handleOrderSubmit = (order) => {
    if (items.length === 0) {
      alert("아이템을 추가해 주세요!");
    } else {
      axios
        .post("http://localhost:8080/api/v1/orders", {
          email: order.email,
          address: order.address,
          postcode: order.postcode,
          orderItems: items.map((v) => ({
            productId: v.productId,
            category: v.category,
            price: v.price,
            quantity: v.count,
          })),
        })
        .then(
          (v) => alert("주문이 정상적으로 접수되었습니다."),
          (e) => {
            alert("서버 장애");
            console.error(e);
          }
        );
    }
  };
  const stepUI = [SelectMovieSchedule()];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="row justify-content-center m-4">
          <h1 className="text-center">영화 예매하기 </h1>
        </div>
        {stepUI[step]}
      </div>
    </QueryClientProvider>
  );

  function SelectMovieSchedule() {
    return (
      <section className="d-flex flex-column justify-center-center">
        <div className="card">
          <div className="row items-stretch">
            <div className="col-md-12">
              <div className="row p-3 ">
                {/* <div className="col-md-12">날짜선택</div> */}
                <div className="col-md-4 mt-4 d-flex flex-column">
                  <MovieList/>
                </div>
                <div className="col-md-4">극장선택</div>
                <div className="col-md-4 mt-4 d-flex flex-column align-items-start p-3 pt-0">
                  <ProductList
                    products={products}
                    onAddClick={handleAddClicked}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-4 summary p-4">
              <Summary items={items} onOrderSubmit={handleOrderSubmit} />
            </div> */}
          </div>
        </div>
        <button className="mt-3 align-self-end" onClick={handleHealthCheck}>
          조회하기
        </button>
      </section>
    );
  }
}

export default App;
