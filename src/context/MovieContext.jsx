import { createContext, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const auth = getAuth();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const loadUserList = () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const savedList = localStorage.getItem(`movieList_${userId}`);
        setMyList(savedList ? JSON.parse(savedList) : []);
      } else {
        setMyList([]);
      }
    };

    loadUserList();
    const unsubscribe = auth.onAuthStateChanged(loadUserList);
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      localStorage.setItem(`movieList_${userId}`, JSON.stringify(myList));
    }
  }, [myList, auth]);

  const addToList = (movie) => {
    if (!auth.currentUser) {
      throw new Error("You must be logged in to add movies to your list");
    }

    setMyList((prevList) => {
      if (!prevList.some((item) => item.id === movie.id)) {
        return [...prevList, movie];
      }
      return prevList;
    });
  };

  const removeFromList = (movieId) => {
    if (!auth.currentUser) {
      throw new Error("You must be logged in to remove movies from your list");
    }

    setMyList((prevList) => prevList.filter((item) => item.id !== movieId));
  };

  const isInList = (movieId) => {
    if (!auth.currentUser) return false;
    return myList.some((item) => item.id === movieId);
  };

  const isAuthenticated = () => {
    return !!auth.currentUser;
  };

  return (
    <MovieContext.Provider
      value={{
        myList,
        addToList,
        removeFromList,
        isInList,
        isAuthenticated,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
