const MovieTrailer = ({ trailer }) => {
  if (!trailer) return <p className="text-white text-center h-96 flex items-center justify-center">No trailer available</p>;

  return (
    <iframe
      key={trailer.id}
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${trailer.key}`}
      title={trailer.name}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="border-2 border-gray-200 mb-4"
    ></iframe>
  );
};

export default MovieTrailer;
