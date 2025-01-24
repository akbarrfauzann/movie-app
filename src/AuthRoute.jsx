import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "./Components/Loader";

const AuthRoute = ({ children }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("unauthorized");
        setLoading(false);
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <Loader />;

  return <div>{children}</div>;
};

export default AuthRoute;
