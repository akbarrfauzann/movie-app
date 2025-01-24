import { FaStar, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : <p>Image not found</p>;
  const truncatedOverview = movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview;

  return (
    <div className="group relative overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h1 className="text-white text-xl font-bold">{movie.title || "Unknown Title"}</h1>
        <div className="flex items-center text-white mb-2">
          <FaStar className="mr-2 text-yellow-400" />
          <span>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
        </div>
        <p className="text-gray-200 text-sm mb-4">{truncatedOverview}</p>
        <button onClick={() => navigate(`/movies/${movie.id}?source=popular`)} type="button" className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center" aria-label={`Watch trailer of ${movie.title}`}>
          <FaPlay className="mr-2" />
          Watch Trailer
        </button>
      </div>
      <h2 className="text-1xl text-center text-gray-200 font-semibold mt-4">
        {movie.title} (<span>{new Date(movie.release_date).getFullYear()}</span>)
      </h2>
    </div>
  );
};

export default MovieCard;
