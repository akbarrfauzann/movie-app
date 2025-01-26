import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { movieService } from "../services/api";
import Card from "./SearchCard";

const SearchBar = ({ variant = "desktop" }) => {
  const [activeSearch, setActiveSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);

  const className = variant === "mobile" ? "w-full md:w-auto text-sm" : "w-full";
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      setActiveSearch([]);
      return;
    }

    try {
      const response = await movieService.searchMovies(value);
      setActiveSearch(response.results.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center border rounded-full px-2 py-1 bg-transparent border-red-600 w-full md:w-auto">
        <FiSearch className="text-white w-4 h-4 md:w-5 md:h-5" />
        <input
          type="search"
          name="search"
          value={searchValue}
          placeholder="Search movies"
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          className="w-full bg-transparent text-white outline-none ml-1 md:ml-2 text-sm md:text-base"
        />
      </div>
      {activeSearch.length > 0 && isFocused && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
          {activeSearch.map((movie) => (
            <Card key={movie.id} id={movie.id} title={movie.title} image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} year={movie.release_date ? movie.release_date.split("-")[0] : "Unknown"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
