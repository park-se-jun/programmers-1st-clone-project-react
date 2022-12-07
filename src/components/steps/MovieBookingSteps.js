import React from "react";
import { useRecoilValue } from "recoil";
import { bookingStepState } from "../../atom/atom";
import { SelectSeatStep } from "./SelectSeatStep";
import { SelectMovieScheduleStep } from "./SelectMovieScheduleStep";



export function MovieBookingSteps() {
  const bookingStep = useRecoilValue(bookingStepState);
  const stepUI = [SelectMovieScheduleStep(), SelectSeatStep()];
  return <>{stepUI[bookingStep]}</>;
}



