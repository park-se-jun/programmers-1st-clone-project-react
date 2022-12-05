import { Product } from "./Product";
import React from "react";
import { useQuery } from "react-query";
import { getActiveMovieList } from "../api/api";

export function MovieList() {
  const fetchMovieList = async (key) => {
    const { data } = await getActiveMovieList();
    return data;
  };

  const { status, data, error, refetch } = useQuery(
    ["MovieList"],
    fetchMovieList
  );
  return (
    <>
      <h5 className="flex-grow-0">
        <b>영화 목록</b>
      </h5>
      <ul className="list-group products">
        {data?.map((movie) => (
          <li key={movie.movieId} className="list-group-item d-flex mt-3 p-0">
            <Movie movie={movie}/>
          </li>
        ))}
        {/* {products.map(v =>
                    <li key={v.productId} className="list-group-item d-flex mt-3">
                        <Product {...v} onAddClick={onAddClick}/>
                    </li>
                )} */}
      </ul>
    </>
  );
}
function Movie({movie}) {
  return <>
    <img
      src={movie.posterUrl}
      alt="포스터"
      className="rounded-start" />
    <div className="d-flex flex-column justify-content-between py-1">
      <h6>{movie.title}</h6>
      <span className="text-muted">
        개봉일: {movie.releaseDate}
      </span>
    </div>
  </>;
}

