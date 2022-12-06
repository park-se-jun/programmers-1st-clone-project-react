import { atom } from "recoil";

export const selectedMovieIdState = atom({
    key:"selectedMovieIdState",
    default: null
});
export const selectedTheaterIdState = atom({
    key:"selectedTheaterIdState",
    default: null
})
export const selectedScheduleState = atom({
    key:"selectedScheduleState",
    default:null
})
export const bookingStepState = atom({
  key: 'bookingStepState',
  default: 0,
});