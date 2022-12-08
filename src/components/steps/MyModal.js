import Modal from "react-modal";
import React, {useState} from "react";
import * as PropTypes from "prop-types";
import {findResorvationByPhoneNumber} from "../../api/api";
import {SeatItem} from "../SeatItem";

export function MyModal(props) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [reservationList, setReservationList] = useState([]);

    function changePhoneNumberInputChanged(e) {
        setPhoneNumber(e.target.value);
    }

    function submitPhoneNumber(e) {
        function parseResponseData(data) {
            return data.map(element => {
                const seatList = element.rowArray.map((row, index) => {
                    return (row + element.colArray[index])
                });
                delete element.rowArray;
                delete element.colArray;
                return {
                    ...element, seatList
                }
            });
        }

        findResorvationByPhoneNumber(phoneNumber)
            .then(value => {
                setReservationList(
                    parseResponseData(value.data)
                );

                console.log(value);
            })
            .catch(e => {
                alert("조회하는데 실패했습니다")
                console.error(e);
            })
    }

    return <Modal className="my-modal row"
                  overlayClassName={"my-modal-overlay"}
                  isOpen={props.open}
                  onAfterOpen={props.onAfterOpen}
                  onRequestClose={()=>{
                    setPhoneNumber("");
                    setReservationList([])
                    props.onRequestClose();
                }}
                  contentLabel="Example Modal"
    >
        <h2 className={"col-md-12 text-center pt-3"}>예매내역 조회하기</h2>
        <hr/>
        <h3 className={"col-md-12 text-center pt-3"}>전화 번호로 조회하기</h3>
        <div className={"col-md-12"}>


        <div className={"row justify-content-evenly"}>
            <div className=" col-md-10 row">
                <input type="tel" className="form-control col-md-6" id="phoneNumber" value={phoneNumber}
                       placeholder="000-0000-0000"
                       pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                       onChange={changePhoneNumberInputChanged}/>
            </div>
            <button className={"col-md-1"} type={"submit"} onClick={submitPhoneNumber}>조회</button>

        </div>
        </div>
        <div className={"d-flex gap-2 py-4 flex-wrap "}>

            {reservationList.map(reservation => {
                return (

                    <div className="card text-bg-light mb-3 p-0" style={{maxWidth: "18rem",minWidth:"18rem"}}>
                        <div className="card-header">
                            <h5 className="card-title">{reservation.movieTitle}</h5>
                        </div>
                        <div className="card-body">
                            <div className={"d-flex justify-content-between"} >

                            <h6>{reservation.date}</h6>
                            <span
                                className={"text-muted"}>{reservation.movieStartTime}~{reservation.movieEndTime}</span>
                            </div>
                            <div>예매 좌석 수 : {reservation.seatCount}</div>
                            <div>예매된 좌석 :</div>
                            <div className={"d-flex gap-1"}>

                            {reservation.seatList.map(seatName => <SeatItem seatName={seatName}/>)}
                            </div>
                            <div>고객 번호: {reservation.phone}</div>
                        </div>
                        <div className={"card-footer"}>
                            예매권 번호 :<br/>{reservation.movieReservationId}
                        </div>
                    </div>

                )
            })}
        </div>
        <div className={"col-md-12 "}></div>
        <div className={"col-md-12 "}></div>
        <div className={"col-md-12 "}></div>

    </Modal>;
}

MyModal.propTypes = {
    open: PropTypes.bool,
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func
};