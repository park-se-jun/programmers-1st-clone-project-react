import React from "react";
import { MovieList } from "../MovieList";
import { TheaterList } from "../TheaterList";
import { ScheduleList } from "../ScheduleList";
import { handleHealthCheck } from "../../App";

export function SelectMovieScheduleStep() {
  return (
    <section className="d-flex flex-column justify-center-center">
      <div className="card">
        <div className="row items-stretch">
          <div className="row p-3 ">
            <div className="col-md-4 mt-4">
              <MovieList />
            </div>
            <div className="col-md-2 mt-4 ">
              <TheaterList />
            </div>
            <div className="col-md-6 mt-4 p-3 pt-0">
              <ScheduleList />
            </div>
          </div>
        </div>
      </div>
      <button className="mt-3 align-self-end" onClick={handleHealthCheck}>
        조회하기
      </button>
    </section>
  );
}
