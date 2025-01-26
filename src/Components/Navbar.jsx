import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthSection from "./AuthSection";
import logo from "../assets/images/logo1.webp";
import SearchBar from "./SearchBar";
import { HashLink } from "react-router-hash-link";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmToast } from "react-confirm-toast";

const Navbar = () => {
  const [state, setState] = useState({ isMenuOpen: false, isDropdownOpen: false, loading: true, user: null, error: null });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navRef = useRef();
  const auth = getAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        navRef.current?.classList.add("bg-black", "backdrop-blur-sm");
      } else {
        navRef.current?.classList.remove("bg-black", "backdrop-blur-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setState((prevState) => ({ ...prevState, user: currentUser, loading: false }));
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      await signOut(auth);
      setState((prevState) => ({ ...prevState, isDropdownOpen: false, user: null, loading: false }));
    } catch (error) {
      console.error("Error signing out:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
      toast.error("Failed to sign out. Please try again.");
    } finally {
      setShowLogoutConfirm(false);
    }
  };

  const toggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full bg-transparent z-50" role="navigation">
      <div className="container mx-auto px-10 py-2 justify-between text-white flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="logo" width={50} height={50} />
        </Link>

        <ul className="hidden space-x-10 uppercase font-bold xl:flex">
          <li>
            <HashLink to="/#" className="hover:text-red-600 transition-colors">
              Home
            </HashLink>
          </li>
          <li>
            <HashLink to="/#movies" className="hover:text-red-600 transition-colors">
              Movies
            </HashLink>
          </li>
          <li>
            <Link to="/movies-list" className="hover:text-red-600 transition-colors">
              My List
            </Link>
          </li>
        </ul>

        <div className="hidden items-center space-x-8 xl:flex">
          <SearchBar />
          <AuthSection
            user={state.user}
            loading={state.loading}
            error={state.error}
            handleLogout={() => setShowLogoutConfirm(true)}
            isDropdownOpen={state.isDropdownOpen}
            setIsDropdownOpen={(isOpen) => {
              setState((prevState) => ({
                ...prevState,
                isDropdownOpen: isOpen,
              }));
            }}
          />
        </div>

        <div className="xl:hidden flex items-center space-x-4">
          <SearchBar variant="mobile" />
          <button type="button" aria-label="Toggle menu" aria-controls="mobile-menu" onClick={toggleMenu}>
            <IoMdMenu className="h-6 w-6 cursor-pointer hover:text-red-600 transition-colors" />
          </button>
        </div>

        <ul
          id="mobile-menu"
          className={`absolute top-14 left-0 w-full bg-black/90 text-white flex flex-col space-y-4 items-center py-6 font-bold xl:hidden transition-all duration-300 ease-in-out transform ${state.isMenuOpen ? "block" : "hidden"}`}
          aria-expanded={state.isMenuOpen}
        >
          {state.user && <li className="text-sm font-semibold">{state.user.displayName}</li>}
          <li className="w-full text-center px-6 py-2 hover:bg-gray-200 hover:text-red-600">
            <Link to="/" className="transition-colors uppercase">
              Home
            </Link>
          </li>
          <li className="w-full text-center px-6 py-2 hover:bg-gray-200 hover:text-red-600">
            <HashLink to="/#movies" className="transition-colors uppercase">
              Movies
            </HashLink>
          </li>
          <li className="w-full text-center px-6 py-2 hover:bg-gray-200 hover:text-red-600">
            <Link to="/movies-list" className="transition-colors uppercase">
              My List
            </Link>
          </li>

          {!state.user ? (
            <>
              <li>
                <Link to="/login" className="bg-red-600 text-white font-bold px-6 py-1 rounded-2xl hover:bg-red-700 transition-colors">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-red-600 transition-colors">
                  SIGN UP
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button type="button" onClick={() => setShowLogoutConfirm(true)} disabled={state.loading} className="hover:text-red-600 transition-colors">
                {state.loading ? "Logging out..." : "LOGOUT"}
              </button>
            </li>
          )}
        </ul>
      </div>
      <ConfirmToast showConfirmToast={showLogoutConfirm} setShowConfirmToast={setShowLogoutConfirm} toastText="Are you sure you want to logout?" buttonYesText="Ok" buttonNoText="Cancel" customFunction={handleLogout} position="top-center" />
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
