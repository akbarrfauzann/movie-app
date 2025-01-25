import { useNavigate } from "react-router-dom";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`, "_blank");
  };
  return (
    <div className="group cursor-pointer justify-items-center" onClick={handleClick}>
      <div className="relative overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} loading="lazy" className="w-52 h-48 sm:h-64 md:h-72 xl:h-72 object-cover" />
      </div>
      <h1 className="text-1xl text-center text-gray-200 font-semibold mt-4">
        {movie.title} ({movie.release_date.slice(0, 4)})
      </h1>
    </div>
  );
};

export default MovieCard;
