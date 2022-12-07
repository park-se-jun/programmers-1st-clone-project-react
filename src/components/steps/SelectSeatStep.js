import React, { useState } from "react";
import { Summary } from "../Summary";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { selectedScheduleState } from "../../atom/atom";
import { useEffect } from "react";
import { getSeatMapByScheduleId } from "../../api/api";
import SeatPicker from "react-seat-picker";

const parseResponseToState = (response) => {
  const returnValue = [];
  for (const [rowName, reservedStateArray] of Object.entries(response.seats)) {
    const rowStateArray = reservedStateArray.map((reservedInfo, index) => {
      const mappedValue = {
        id: rowName + index,
        number: rowName + index,
        isReserved: !reservedInfo,
      };
      return mappedValue;
    });
    returnValue.push(rowStateArray);
  }

  return returnValue;
};

export function SelectSeatStep() {
  const [items, setItems] = useState([]);
  const [seatMap, setSeatMap] = useState(null);
  const selectedSchedule = useRecoilValue(selectedScheduleState);



  useEffect(() => {
    console.log(selectedSchedule);
    getSeatMapByScheduleId(selectedSchedule).then((data) => {
      setSeatMap(parseResponseToState(data.data));
      console.log(data.data);
      console.log(seatMap);
    });
  }, [selectedSchedule]);


  const addSeatCallback = ({row, number, id}, addCb)=>{
    setItems((prevItems)=>[...prevItems,number]);
    addCb(row, number, id);
  }
  const removeSeatCallback = ({row, number, id}, removeCb) =>{
    setItems((prevItems)=>prevItems.filter(element=>element!==number));
    removeCb(row,number);
  }

  return (
    <section className="d-flex flex-column justify-center-center">
      <div className="card">
        <div className="row items-stretch">
          <div className="col-md-8 p-4 d-flex">
            {seatMap == null ? (
              () => {
                alert("좌석정보를 불러오는데 실패했습니다.");
                window.location.reload();
              }
            ) : (
              <SeatPicker
                className="m-auto align-items-center justify-content-center"
                rows={seatMap}
                alpha
                maxReservableSeats={8}
                visible
                addSeatCallback={addSeatCallback}
                removeSeatCallback={removeSeatCallback}
              />
            )}
          </div>
          <div className="col-md-4 summary p-4">
            <Summary items={items}/>
          </div>
        </div>
      </div>
    </section>
  );
}
