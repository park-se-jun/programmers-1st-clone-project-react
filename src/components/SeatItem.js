import React from "react";

export function SeatItem({seatName}) {
    return (
        <span className="badge bg-dark ">{seatName}</span>
    );
}