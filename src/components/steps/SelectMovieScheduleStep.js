import React, {useState} from "react";
import {MovieList} from "../MovieList";
import {TheaterList} from "../TheaterList";
import {ScheduleList} from "../ScheduleList";
import Modal from "react-modal"
import * as PropTypes from "prop-types";
import {MyModal} from "./MyModal";



export function SelectMovieScheduleStep() {
  const [modalIsOpen,setIsOpen]=useState(false)
  function openModal() {
    setIsOpen(true);
    console.log(123)
  }
  Modal.setAppElement("#root")
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <section className="d-flex flex-column justify-center-center">
      <MyModal open={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal}/>
      <div className="reservation-card">
        <div className="row items-stretch">
          <div className="row p-3 ">
            <div className="col-md-4 mt-4">
              <MovieList/>
            </div>
            <div className="col-md-2 mt-4 ">
              <TheaterList/>
            </div>
            <div className="col-md-6 mt-4 p-3 pt-0">
              <ScheduleList/>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-3 align-self-end" onClick={() => openModal()}>
        조회하기
      </button>
    </section>
  );
}
