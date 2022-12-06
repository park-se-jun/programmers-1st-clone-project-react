import React from "react";
import {  getScheduleList } from "../api/api";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import { useEffect } from "react";
import { bookingStepState, selectedMovieIdState, selectedScheduleState, selectedTheaterIdState } from "../atom/atom";

export function ScheduleList() {
  const [scheduleList, setScheduleList] = useState([]);
  const selectedMovieId = useRecoilValue(selectedMovieIdState);
  const selectedTheaterId = useRecoilValue(selectedTheaterIdState);
  const setSelectedScheduleId = useSetRecoilState(selectedScheduleState);
  const setBookingStep = useSetRecoilState(bookingStepState);
  useEffect(() => {
    getScheduleList({
      theaterId: selectedTheaterId,
      movieId: selectedMovieId,
    })
      .then((data) => {
        console.log(data.data);
        setScheduleList(data.data);
      })
      .catch((error) => setScheduleList([]));
  }, [selectedMovieId, selectedTheaterId]);

  const handleScheduleClick = (scheduleId) =>{
    setSelectedScheduleId(scheduleId)
    setBookingStep(1);
  }
  return (
    <>
      <h5 className="flex-grow-0">
        <b>영화 스케쥴</b>
      </h5>
      <ul className="list-group products">
        {scheduleList?.map((schedule) => (
          <li
            key={schedule.scheduleId}
            className={`list-group-item d-flex mt-3 px-3 list-group-item-action justify-content-between gap-3`}
            onClick ={()=>handleScheduleClick(schedule.scheduleId)}
          >
            <Schedule schedule={schedule}/>
          </li>
        ))}
      </ul>
    </>
  );
}
function Schedule({schedule}) {
  return <>
    <div className=" d-flex flex-column flex-shrink-1 ">
      <span className="fw-bold">{schedule.startTime}</span>
      <span className="text-muted">{schedule.endTime}</span>
    </div>
    <div className="flex-grow-1">
      <span>{schedule.title}</span>
    </div>
    <div className=" d-flex flex-column flex-shrink-1 align-items-end">
      <span>{schedule.theaterName}</span>
      <span>{schedule.screenName} 관</span>
    </div>
  </>;
}

