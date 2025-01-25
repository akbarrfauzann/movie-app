import backgroundImage from "/src/assets/images/background.png";
import React, { useState } from "react";
import { movieService } from "../../services/api";
import { IoIosArrowDown } from "react-icons/io";

const MovieCard = React.lazy(() => import("./MovieCard"));

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const genresRef = React.useRef(null);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [movies, genresData] = await Promise.all([movieService.getDiscoverMovies(), movieService.getGenres()]);
        setMovieList(movies.results);
        setGenres(genresData.genres);
      } catch (error) {
        setError("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    const handleClickOutside = (event) => {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["All", ...genres.map((genre) => genre.name)];

  const filteredMovies = React.useMemo(() => {
    return selectedCategory === "" ? movieList : movieList.filter((movie) => movie.genre_ids.some((id) => genres.find((genre) => genre.id === id)?.name === selectedCategory));
  }, [selectedCategory, movieList, genres]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === "All" ? "" : category);
    setDropdownOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <section
      id="movies"
      className="bg-cover bg-center relative pt-10 w-full"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
        backgroundColor: "#000",
      }}
    >
      <div className="container mx-auto w-full px-4 sm:px-8 pt-8 sm:pt-10" data-aos="fade-up">
        <div className="flex flex-row justify-between items-baseline mb-8 sm:mb-10 space-y-4 sm:space-y-0">
          <h1 className="text-2xl md:text-4xl font-semibold font-kameron uppercase text-white">Movies</h1>
          <div className="relative">
            <button
              type="button"
              className="bg-neutral-600 text-white font-bold px-4 py-2 rounded-md border-2 border-neutral-500 hover:bg-neutral-700 transition-colors flex items-center space-x-2 text-sm md:text-base"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <span>{selectedCategory || "Categories"}</span>
              <IoIosArrowDown className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-full sm:w-32 md:w-40 bg-white bg-opacity-20 rounded-lg shadow-lg overflow-auto backdrop-blur-sm" style={{ maxHeight: "20rem" }} ref={genresRef}>
                <ul className="text-sm md:text-base text-gray-800">
                  {categories.map((category) => (
                    <li key={category} className="px-3 py-2 md:px-4 md:py-2 text-white hover:bg-white bg-transparent hover:bg-opacity-20 transition-colors duration-300 cursor-pointer" onClick={() => handleCategorySelect(category)}>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 pb-8">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movies;
