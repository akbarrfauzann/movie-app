const MovieRecommendations = ({ recommendations }) => (
  <div className="text-center">
    <h1 className="pb-4 text-white font-bold">Recommendation Movies</h1>
    {recommendations.map((recommendation) => (
      <img
        key={recommendation.id}
        src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
        alt={recommendation.title}
        className="mx-auto mb-6 w-48 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        onClick={() => (window.location.href = `/movies/${recommendation.id}`)}
      />
    ))}
  </div>
);

export default MovieRecommendations;
