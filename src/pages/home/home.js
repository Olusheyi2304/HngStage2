import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MovieList from "../../components/movielist/movielist";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((Movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${Movie.id}`}
            >
              <div className="posterImage" data-testid="movie-poster">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    Movie && Movie.backdrop_path
                  }`}
                />
                <div className="searchbar">
                  <input
                    className="w-full md:w-[100%] xl:w-[525px] h-9 px-2.5 py-1.5 rounded-md border border-primary-100 justify-between items-center gap-2.5 flex  text-primary-100"
                    placeholder="What do you want to watch?"
                  />
                  <i class="bx bx-search" className="icon"></i>
                </div>
              </div>

              <div className="posterImage__overlay">
                <div className="posterImage__title" data-testid="movie-title">
                  {Movie ? Movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {Movie ? Movie.release_date : ""}
                  <span className="posterImage__rating">
                    🍅{Movie ? Movie.vote_average * 10 : ""}%
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__description">
                  {Movie ? Movie.overview : ""}
                </div>
                <button>
                  <i class="bx bx-play"></i>
                  <h1>Watch Trailer</h1>
                </button>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};
export default Home;
