import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { useMovie } from "../../hooks/useMovie";

const MovieInfo = ({ movie }) => {
  const { addToList, removeFromList, isInList, isAuthenticated } = useMovie();
  const handleListClick = () => {
    if (!isAuthenticated()) {
      alert("Please login to add movies to My List");
      return;
    }

    if (movie) {
      if (isInList(movie.id)) {
        removeFromList(movie.id);
        alert("Movie removed from My List");
      } else {
        addToList(movie);
        alert("Movie added to My List");
      }
    }
  };

  const isMovieInList = movie && isInList(movie.id);

  return (
    <div className="text-white rounded-xl py-4">
      <div className="flex space-x-4 font-semibold font-roboto">
        <p className="text-2xl font-bold font-kameron uppercase content-center">{movie.title}</p>
        <button
          onClick={handleListClick}
          className={`border-2 ${isAuthenticated() && isMovieInList ? "border-yellow-500 hover:bg-yellow-600" : "border-red-500 hover:bg-red-600"}
           text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition-colors`}
        >
          {isAuthenticated() && isMovieInList ? (
            <>
              <FaMinus className="mr-2" />
              REMOVE FROM LIST
            </>
          ) : (
            <>
              <FaPlus className="mr-2" /> ADD TO LIST
            </>
          )}
        </button>
      </div>
      <div className="flex items-center text-sm font-semibold uppercase py-4">
        <FaStar className="h-4 w-4 text-yellow-500" />
        <span className="ml-1">{movie.vote_average?.toFixed(1)}</span>
        <span className="mx-2">|</span>
        <span>{movie.release_date?.slice(0, 4)}</span>
        <span className="mx-2">|</span>
        <span>{movie.runtime} min</span>
        <span className="mx-2">|</span>
        <span>{movie.genres?.map((genre) => genre.name).join(", ")}</span>
      </div>
      <p className="text-gray-200 max-w-4xl">{movie.overview}</p>
    </div>
  );
};

export default MovieInfo;
