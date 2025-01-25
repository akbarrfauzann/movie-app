import { useNavigate } from "react-router-dom";

const MovieRecommendations = ({ recommendations }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="pb-4 text-white font-bold">Recommendation Movies</h1>
      {recommendations.map((recommendation) => (
        <img
          key={recommendation.id}
          src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
          alt={recommendation.title}
          className="mx-auto mb-6 w-48 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          onClick={() => navigate(`/movies/${recommendation.id}`)} // Ganti window.location.href dengan navigate
        />
      ))}
    </div>
  );
};

export default MovieRecommendations;
