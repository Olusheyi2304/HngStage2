import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="cards">
            <img
              className="cards__img"
              data-testid="movie-poster"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
            />
            <div className="cards__overlay">
              <div className="card__title" data-testid="movie-title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card__runtime" data-testid="movie-release-date">
                {movie ? movie.release_date : ""}
                <span className="card__rating">
                  🍅{movie ? movie.vote_average * 10 : ""}%
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card__description" data-testid="movie-overview">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
