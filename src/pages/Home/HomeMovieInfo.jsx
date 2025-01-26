import { FaPlay, FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../../hooks/useMovie";
import { ToastContainer, toast } from "react-toastify";

const HomeMovieInfo = ({ movie }) => {
  const navigate = useNavigate();
  const { addToList, removeFromList, isInList, isAuthenticated } = useMovie();

  const handleWatchClick = () => {
    if (movie?.id) {
      navigate(`/movies/${movie.id}?source=carousel`);
    }
  };

  const handleListClick = () => {
    if (!isAuthenticated()) return alert("Please login to add movies to your list");

    if (movie) {
      if (isInList(movie.id)) {
        removeFromList(movie.id);
        toast.error("Movie removed from My List");
      } else {
        addToList(movie);
        toast.success("Movie added to My List");
      }
    }
  };

  const isMovieInList = movie && isInList(movie.id);

  return (
    <div className="text-white rounded-xl px-10">
      <h1 className="text-1xl sm:text-2xl md:text-3xl xl:text-4xl font-bold font-kameron uppercase truncate">{movie?.title || "Unknown Title"}</h1>
      <div className="flex items-center text-sm font-semibold uppercase mb-2">
        {movie?.vote_average ? (
          <>
            <FaStar className="h-4 w-4 text-yellow-500" />
            <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
          </>
        ) : (
          <span>No Rating</span>
        )}
        <span className="mx-2">|</span>
        <span>{movie?.release_date ? movie.release_date.slice(0, 4) : "Unknown Year"}</span>
        <span className="mx-2">|</span>
        <span>{movie?.runtime ? `${movie.runtime} min` : "Runtime not available"}</span>
      </div>
      <p className="text-sm sm:line-clamp-none line-clamp-2" style={{ maxWidth: "500px" }}>
        {movie?.overview || "No description available for this movie"}
      </p>
      <div className="flex space-x-4 mt-4 font-semibold font-roboto">
        <button onClick={handleWatchClick} className="bg-red-600 text-white px-4 py-3 text-sm rounded-full flex items-center" aria-label="Watch Trailer">
          <FaPlay className="mr-2 w-4 h-4" />
          WATCH
        </button>
        <button
          onClick={handleListClick}
          className={`border-2 ${isAuthenticated() && isMovieInList ? "border-yellow-500 hover:bg-yellow-600" : "border-red-600 hover:bg-red-600"} 
            text-white px-4 py-3 text-sm rounded-full flex items-center transition-colors`}
        >
          {isAuthenticated() && isMovieInList ? (
            <>
              <FaMinus className="mr-2 w-4 h-4" />
              REMOVE FROM LIST
            </>
          ) : (
            <>
              <FaPlus className="mr-2 w-4 h-4" />
              ADD TO LIST
            </>
          )}
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default HomeMovieInfo;
