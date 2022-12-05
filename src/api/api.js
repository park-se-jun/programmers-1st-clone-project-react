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
    return baseApiClient.get("api/movies");
    // return baseApiClient.get
}

// export const healthcheck
