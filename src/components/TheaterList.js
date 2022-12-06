import React from "react";
import { getAllTheaterList } from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { selectedTheaterIdState } from "../atom/atom";
import { useRecoilState } from "recoil";

export function TheaterList() {
  const [theaterList, setTheaterList] = useState([]);
  const [selectedTheaterId, setSelectedTheaterId] = useRecoilState(selectedTheaterIdState);
  useEffect(() => {;
    getAllTheaterList().then(data => setTheaterList(data.data));
  }, [])
  
  const handleOnClickTheater = (theaterId) =>{
    if(selectedTheaterId === theaterId){
      setSelectedTheaterId("");
    }
    else{
      setSelectedTheaterId(theaterId);
    }
  }
  return (
    <>
      <h5 className="flex-grow-0">
        <b>극장 목록</b>
      </h5>
      <ul className="list-group products">
        {theaterList?.map((theater) => (
          <li
            key={theater.theaterId}
            className={`list-group-item d-flex mt-3 p-0 list-group-item-action ${selectedTheaterId===theater.theaterId?"active":""}`}
            onClick={()=>handleOnClickTheater(theater.theaterId)}
          >
            <Theater theater={theater} />
          </li>
        ))}
        {/* {products.map(v =>
                    <li key={v.productId} className="list-group-item d-flex mt-3">
                        <Product {...v} onAddClick={onAddClick}/>
                    </li>
                )} */}
      </ul>
    </>
  );
}
function Theater({ theater }) {
  return <span className=" py-1">{theater.theaterName}</span>;
}
