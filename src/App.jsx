import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Header from "./Layouts/Header";
import MovieDetails from "./pages/MovieDetails/MovieDetailsPage";
import MoviesList from "./pages/MoviesList/MoviesListPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Footer from "./Layouts/Footer";
import AuthRoute from "./AuthRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import { MovieProvider } from "./context/MovieContext";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <MovieProvider>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/carousel/:id"
            element={
              <AuthRoute>
                <MovieDetails />
              </AuthRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <AuthRoute>
                <MovieDetails />
              </AuthRoute>
            }
          />
          <Route
            path="/movies-list"
            element={
              <AuthRoute>
                <MoviesList />
              </AuthRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </HashRouter>
    </MovieProvider>
  );
}

export default App;
