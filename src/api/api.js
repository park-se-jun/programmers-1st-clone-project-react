import axios from "axios";

const baseApiClient = axios.create(
    {
        baseURL:"http://localhost:8080",
        headers:{
            "content-Type" : "application/json"
        }
    }
);
export const healthCheck = ()=>{
    return baseApiClient.get("/health");
}
export const getActiveMovieList = () =>{
    return baseApiClient.get("api/movies/active");
    // return baseApiClient.get
}
export const getAllTheaterList = () =>{
    return baseApiClient.get("api/theaters");
}
export const getScheduleList = (requestParams)=>{
    return baseApiClient.get("api/schedules",{
        params : requestParams
    })
}
export const getSeatMapByScheduleId =(scheduleId)=>{
    return baseApiClient.get(`api/schedules/${scheduleId}/seats`);
}
// export const healthcheck
