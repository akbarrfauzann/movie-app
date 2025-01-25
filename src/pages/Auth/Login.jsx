import backgroundImage from "/src/assets/images/background.png";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const backgroundStyle = {
  width: "100%",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${backgroundImage})`,
};
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const singInWithEmail = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setAuthing(true);
    setError("");

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many requests. Try again later.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setAuthing(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="bg-cover bg-center relative pt-4" style={backgroundStyle}>
      <div className="container mx-auto w-full pt-10 text-white">
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
          <div className="max-w-md w-full mx-auto border rounded-2xl p-8 bg-transparent">
            <div className="text-center mb-10 font-kameron">
              <h1 className="text-2xl font-semibold">
                HELLO!
                <br />
                <span className="block">WELCOME BACK</span>
              </h1>
            </div>

            <form onSubmit={singInWithEmail} className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="text-gray-800 font-bold bg-white border border-gray-300 w-full text-sm px-4 py-4 rounded-xl outline-black pr-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email"
                  placeholder="EMAIL ADDRESS"
                  required
                />
                <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
                  <MdEmail />
                </span>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="text-gray-800 font-bold bg-white border border-gray-300 w-full text-sm px-4 py-4 rounded-xl outline-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    aria-label="Password"
                    required
                  />
                  <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" role="button" onClick={togglePasswordVisibility} aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div role="alert" aria-live="polite">
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </div>

                <div className="text-sm text-right">
                  <Link to="#" className="font-semibold text-white hover:text-red-600">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className={`w-full text-1xl py-4 px-4 tracking-wider font-semibold rounded-xl text-white ${authing ? "bg-gray-400" : "bg-red-600"} focus:outline-none active:scale-[0.98] duration-75 transition-all`}
                  disabled={authing}
                >
                  {authing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing In...
                    </span>
                  ) : (
                    "SIGN IN"
                  )}
                </button>
              </div>
              <p className="text-white text-sm mt-6 text-center">
                Don&apos;t have an account?
                <Link to="/register" className="text-red-600 font-semibold hover:underline ml-1">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
