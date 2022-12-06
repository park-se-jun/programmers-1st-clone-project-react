import React from "react";
import { getActiveMovieList } from "../api/api";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useEffect } from "react";
import { selectedMovieIdState } from "../atom/atom";

export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    getActiveMovieList().then((data) => setMovieList(data.data));
  }, []);

  const [selectedMovieId, setSelectedMovieId] =
    useRecoilState(selectedMovieIdState);

  const handleOnClickItem = (movieId) => {
    if (selectedMovieId === movieId) {
      setSelectedMovieId("");
    } else {
      setSelectedMovieId(movieId);
    }
  };

  return (
    <>
      <h5 className="flex-grow-0">
        <b>영화 목록</b>
      </h5>
      <ul className="list-group products">
        {movieList?.map((movie) => (
          <li
            key={movie.movieId}
            className={`list-group-item d-flex mt-3 p-0 list-group-item-action  
          ${selectedMovieId === movie.movieId ? "active" : ""}`}
            onClick={() => handleOnClickItem(movie.movieId)}
          >
            <Movie movie={movie} />
          </li>
        ))}
      </ul>
    </>
  );
}
function Movie({ movie }) {
  return (
    <>
      <img src={movie.posterUrl} alt="포스터" className="rounded-start" />
      <div className="d-flex flex-column justify-content-between py-1">
        <h6>{movie.title}</h6>
        <span className="text-muted">개봉일: {movie.releaseDate}</span>
      </div>
    </>
  );
}
