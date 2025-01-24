import backgroundImage from "/src/assets/images/background.png";
import MovieCard from "./MoviesUpcomingCard";
import { useEffect, useState } from "react";
import { movieService } from "../../services/api";

const backgroundStyle = {
  width: "100%",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
};
const MoviesUpcoming = () => {
  const [popularMoviesData, setPopularMoviesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularMovies = await movieService.getUpcomingMovies();
        setPopularMoviesData(popularMovies.results.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="popular-movies" className="bg-cover bg-center relative" style={backgroundStyle}>
      <div className="container mx-auto w-full px-10 pt-10 pb-10" data-aos="fade-up">
        <h1 className="text-4xl font-semibold font-kameron uppercase text-white mb-10">Upcoming Movies</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? <p className="text-white">Loading upcoming movies...</p> : popularMoviesData?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </section>
  );
};

export default MoviesUpcoming;
