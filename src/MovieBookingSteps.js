import React, { useState } from "react";
import { Summary } from "./components/Summary";
import axios from "axios";
import { MovieList } from "./components/MovieList";
import { TheaterList } from "./components/TheaterList";
import { useRecoilValue } from "recoil";
import { ScheduleList } from "./components/ScheduleList";
import { bookingStepState, selectedScheduleState } from "./atom/atom";
import { handleHealthCheck } from "./App";
import { useEffect } from "react";
import { getSeatMapByScheduleId } from "./api/api";
import SeatPicker from "react-seat-picker";

const rows = [
  [
    { id: 1, number: "A1" },
    { id: 2, number: "A2" },
    { id: 3, number: "A3" },
    { id: 4, number: "A4" },
    { id: 24, number: "A5" },
    { id: 34, number: "A5" },
    { id: 44, number: "A6" },
    { id: 54, number: "A7" },
    null,
    { id: 5, number: "A8" },
    { id: 6, number: "A9" },
    { id: 7, number: "A10" },
    { id: 8, number: "A11" },
    { id: 9, number: "A12", isReserved: true }
  ],
  [
    { id: 11, number: "B1" },
    { id: 12, number: "B2" },
    { id: 13, number: "B3", isReserved: true },
    { id: 14, number: "B4" },
    { id: 74, number: "B5" },
    { id: 84, number: "B6" },
    { id: 34, number: "B7" },
    { id: 94, number: "B8" },
    null,
    { id: 15, number: "B9" },
    { id: 16, number: "B10" },
    { id: 17, number: "B11" },
    { id: 18, number: "B12" },
    { id: 19, number: "B13" }
  ],
  [
    { id: 21, number: "C1" },
    { id: 22, number: "C2" },
    { id: 23, number: "C3" },
    { id: 24, number: "C4" },
    { id: 29, number: "C5" },
    { id: 20, number: "C6" },
    { id: 99, number: "C7" },
    { id: 98, number: "C8" },
    null,
    { id: 25, number: "C9" },
    { id: 26, number: "C10" },
    { id: 27, number: "C11", isReserved: true },
    { id: 28, number: "C12" },
    { id: 29, number: "C13" },
    null
  ],
  [
    { id: 11, number: "D1" },
    { id: 12, number: "D2" },
    { id: 13, number: "D3", isReserved: true },
    { id: 14, number: "D4" },
    { id: 74, number: "D5" },
    { id: 84, number: "D6" },
    { id: 34, number: "D7" },
    { id: 94, number: "D8" },
    null,
    { id: 15, number: "D9" },
    { id: 16, number: "D10" },
    { id: 17, number: "D11" },
    { id: 18, number: "D12" },
    { id: 19, number: "D13" }
  ],
  [
    { id: 11, number: "E1" },
    { id: 12, number: "E2" },
    { id: 13, number: "E3" },
    { id: 14, number: "E4" },
    { id: 74, number: "E5" },
    { id: 84, number: "E6" },
    { id: 34, number: "E7" },
    { id: 94, number: "E8" },
    null,
    { id: 15, number: "E9" },
    { id: 16, number: "E10" },
    { id: 17, number: "E11" },
    { id: 18, number: "E12" },
    { id: 19, number: "E13" }
  ],
  [
    { id: 11, number: "F1" },
    { id: 12, number: "F2" },
    { id: 13, number: "F3" },
    { id: 14, number: "F4" },
    { id: 74, number: "F5" },
    { id: 84, number: "F6" },
    { id: 34, number: "F7" },
    { id: 94, number: "F8" },
    null,
    { id: 15, number: "F9" },
    { id: 16, number: "F10" },
    { id: 17, number: "F11" },
    { id: 18, number: "F12" },
    { id: 19, number: "F13" }
  ],
  [
    { id: 11, number: "G1" },
    { id: 12, number: "G2" },
    { id: 13, number: "G3" },
    { id: 14, number: "G4" },
    { id: 74, number: "G5" },
    { id: 84, number: "G6" },
    { id: 34, number: "G7", isReserved: true },
    { id: 94, number: "G8" },
    null,
    { id: 15, number: "G9" },
    { id: 16, number: "G10" },
    { id: 17, number: "G11" },
    { id: 18, number: "G12" },
    { id: 19, number: "G13" }
  ]
];

export function MovieBookingSteps() {
  const bookingStep = useRecoilValue(bookingStepState);
  const stepUI = [SelectMovieSchedule(), SelectSeat()];
  return <>{stepUI[bookingStep]}</>;
}
function SelectSeat() {
  const [items, setItems] = useState([]);

  const selectedSchedule = useRecoilValue(selectedScheduleState);

  useEffect(()=>{
    console.log(selectedSchedule);
    getSeatMapByScheduleId(selectedSchedule).then(data=>{
      console.log(data.data)
    });
  },[selectedSchedule]);
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
  return (
    <section className="d-flex flex-column justify-center-center">
      <div className="card">
        <div className="row items-stretch">
          <div className="col-md-8 p-4 d-flex">
            <SeatPicker className="m-auto align-items-center justify-content-center"
                    rows={rows}
                    alpha
                    maxReservableSeats={10}
                    visible
            />
          </div>
          <div className="col-md-4 summary p-4">
            <Summary items={items} onOrderSubmit={handleOrderSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}
function SelectMovieSchedule() {
  return (
    <section className="d-flex flex-column justify-center-center">
      <div className="card">
        <div className="row items-stretch">
          <div className="row p-3 ">
            {/* <div className="col-md-12">날짜선택</div> */}
            <div className="col-md-4 mt-4">
              <MovieList />
            </div>
            <div className="col-md-2 mt-4 ">
              <TheaterList />
            </div>
            <div className="col-md-6 mt-4 p-3 pt-0">
              {/* <ProductList
                products={products}
                onAddClick={handleAddClicked}
              /> */}
              <ScheduleList />
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
