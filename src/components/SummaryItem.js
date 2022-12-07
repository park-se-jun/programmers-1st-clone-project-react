import React from "react";

export function SummaryItem({seatName}) {
    return (
        <span className="badge bg-dark ">{seatName}</span>
    );
}