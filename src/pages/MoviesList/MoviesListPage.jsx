import React, { Suspense } from "react";
import backgroundImage from "/src/assets/images/background.png";
import { useMovie } from "../../hooks/useMovie.js";

const MovieCard = React.lazy(() => import("../Movies/MovieCard.jsx"));

const MoviesList = () => {
  const { myList } = useMovie();
  return (
    <section
      id="movies-list"
      className="bg-cover bg-center relative pt-10 w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
        backgroundColor: "#000",
      }}
    >
      <div className="container mx-auto w-full px-4 sm:px-8 pt-8 sm:pt-10" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 space-y-4 sm:space-y-0">
          <h1 className="text-2xl md:text-4xl font-semibold font-kameron uppercase text-white">My List</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 pb-8">
          {myList.length > 0 ? (
            myList.map((movie) => (
              <Suspense key={movie.id} fallback={<div className="w-full h-72 bg-gray-800 animate-pulse rounded-lg"></div>}>
                <MovieCard movie={movie} />
              </Suspense>
            ))
          ) : (
            <div className="col-span-full min-h-[50vh] flex items-center justify-center">
              <p className="text-white text-lg font-medium text-center">No movies in your list</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MoviesList;
