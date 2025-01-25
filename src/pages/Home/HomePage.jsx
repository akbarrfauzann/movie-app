import { useState, useEffect } from "react";
import { movieService } from "../../services/api";
import CarouselNavigation from "./CarouselNavigation";
import HomeMovieInfo from "./HomeMovieInfo";
import LoadingSpinner from "../../Components/Loader";

const HomePage = () => {
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = carouselMovies[currentIndex];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const discoverMovies = await movieService.getDiscoverMovies();
        const moviesWithDetails = await Promise.all(
          discoverMovies.results.slice(0, 3).map(async (movie) => {
            const details = await movieService.getMovieDetails(movie.id);
            return { ...movie, runtime: details.runtime };
          })
        );
        setCarouselMovies(moviesWithDetails);
        console.log("Fetched movies:", moviesWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (carouselMovies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === carouselMovies.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselMovies]);
  /// CAROUSEL NAVIGATION ///

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselMovies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselMovies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  /// END CAROUSEL NAVIGATION ///

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-transition"
      style={{
        backgroundImage: currentData ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original${currentData.backdrop_path})` : "",
      }}
    >
      <CarouselNavigation onPrevious={goToPrevious} onNext={goToNext} />

      <section className="container mx-auto">
        <div className="flex min-h-screen items-center">{currentData && <HomeMovieInfo key={currentData.id} movie={currentData} />}</div>
      </section>
    </main>
  );
};

export default HomePage;
