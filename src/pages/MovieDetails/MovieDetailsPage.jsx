import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieService } from "../../services/api";
import NotFound from "../../components/NotFound";
import MovieTrailer from "./MovieTrailer";
import MovieInfo from "./MovieInfo";
import MovieRecommendations from "./MovieRecommendations";
import LoadingSpinner from "../../Components/Loader";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    movie: null,
    trailer: null,
    recommendations: [],
    loading: true,
    error: null,
  });

  const fetchMovieData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [movieDetails, trailerData, recommendationsData] = await Promise.all([movieService.getMovieDetails(id), movieService.getMovieTrailer(id), movieService.getDiscoverMovies()]);
      if (!movieDetails?.id) {
        throw new Error("Invalid movie data received");
      }

      const trailerVideo = trailerData?.results?.find((video) => video.type === "Trailer" && video.site === "YouTube");
      const shuffledRecommendations = recommendationsData?.results
        ?.slice(0, 10)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      setState({
        movie: movieDetails,
        trailer: trailerVideo || null,
        recommendations: shuffledRecommendations || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to load movie data. Please try again.",
      }));
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    let mounted = true;

    const loadData = async () => {
      if (mounted) {
        await fetchMovieData();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    loadData();

    return () => {
      mounted = false;
    };
  }, [id, navigate, fetchMovieData]);

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <p className="text-xl mb-4 text-center">{state.error}</p>
        <div className="flex gap-4">
          <button onClick={fetchMovieData} className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600" type="button" aria-label="Try again">
            Try Again
          </button>
          <button onClick={() => navigate("/")} className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!state.movie || !state.movie.title) {
    return <NotFound />;
  }

  const { movie, trailer, recommendations } = state;
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;

  return (
    <main className="min-h-screen bg-black">
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat pt-16"
        style={{
          backgroundImage: backdropUrl ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${backdropUrl})` : "none",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <MovieTrailer trailer={trailer} fallbackImage={backdropUrl} title={movie.title} />
              <MovieInfo movie={movie} className="bg-gray-900/50 rounded-xl p-4" />
            </div>
            <div className="xl:col-span-1">
              <MovieRecommendations recommendations={recommendations} className="bg-gray-900/50 rounded-xl p-4" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
