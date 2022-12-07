import {SummaryItem} from "./SummaryItem";
import React, {useState} from "react";
import {createReservation} from "../api/api";
import {useRecoilValue} from "recoil";
import {selectedScheduleState} from "../atom/atom";

const MOVIE_PRICE = 15000;

export function Summary({items = []}) {
    const totalPrice = items.length * MOVIE_PRICE;
    const [order, setOrder] = useState({
        phoneNumber: ""
    });
    const selectedScheduleId = useRecoilValue(selectedScheduleState);

    const changePhoneNumberInputChanged = (e) => {
        setOrder({
            ...order, phoneNumber: e.target.value
        })
    }

    const onOrderSubmit = (order) => {
        function makeRowColArrays(items) {
            const rowArray = [];
            const colArray = [];
            for (const element of items) {
                const [row, col] = element.split(/(?<=\D)(?=\d)/);
                rowArray.push(row);
                colArray.push(col);
            }
            return [rowArray, colArray];
        }

        if (items.length === 0) {
            alert("좌석을 추가해 주세요!");
        } else {
            const [rowArray, colArray] = makeRowColArrays(items);
            const body = {
                scheduleId: selectedScheduleId,
                phoneNumber: order.phoneNumber,
                price: totalPrice,
                rowArray: rowArray,
                colArray: colArray
            }
            console.log(body)
            createReservation(body).then(
                (v) => {
                    alert("주문이 정상적으로 접수되었습니다.")
                    window.location.reload();
                },
                (e) => {
                    alert("서버 장애");
                    console.error(e);
                }
            )
        }
    };
    const handleSubmit = (e) => {
        if (order.phoneNumber === "") {
            alert("입력값을 확인해주세요!")
        } else {
            onOrderSubmit(order);
        }
        console.log(order);
    }
    return (
        <>
            <div>
                <h5 className="m-0 p-0"><b>Summary</b></h5>
            </div>
            <hr/>
            <div className={"d-flex gap-1"}>
                {items.map(item => {
                    return (
                        <SummaryItem key={item} seatName={item}/>
                    )
                })}
            </div>

            <form>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">전화번호</label>
                    <input type="tel" className="form-control" id="phoneNumber" value={order.phoneNumber}
                           placeholder="000-0000-0000"
                           pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                           onChange={changePhoneNumberInputChanged}/>
                </div>
                <div>최대 8자리 까지 예약할 수 있습니다.</div>
            </form>
            <div className="row pt-2 pb-2 border-top">
                <h5 className="col">총 금액</h5>
                <h5 className="col text-end">{totalPrice}원</h5>
            </div>
            <button className="btn btn-dark col-12" onClick={handleSubmit}>결제하기</button>
        </>
    );
}