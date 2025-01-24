import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { movieService } from "../services/api";
import Card from "./SearchCard";

const SearchBar = () => {
  const [activeSearch, setActiveSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);

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
    <div className="relative w-full" ref={searchRef}>
      <div className="flex items-center border rounded-full px-3 py-1 bg-transparent border-red-600">
        <FiSearch className="text-white w-5 h-5" />
        <input type="search" name="search" id="search" value={searchValue} placeholder="Search for movies" onChange={handleSearch} onFocus={() => setIsFocused(true)} className="w-full bg-transparent text-white outline-none ml-2" />
      </div>
      {activeSearch.length > 0 && isFocused && (
        <div className="absolute mt-2 w-full bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {activeSearch.map((movie) => (
            <Card key={movie.id} id={movie.id} title={movie.title} image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} year={movie.release_date ? movie.release_date.split("-")[0] : "Unknown"} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
