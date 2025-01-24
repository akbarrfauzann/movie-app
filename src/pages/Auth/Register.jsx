import backgroundImage from "/src/assets/images/background.png";
import googleIcon from "/src/assets/images/google.png";
import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const backgroundStyle = {
  width: "100%",
  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url(${backgroundImage})`,
};
const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Sign up with Google
  const signUpWithGoogle = async () => {
    setAuthing(true);

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(result.user.uid);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completion.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setAuthing(false);
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (e) => {
    e?.preventDefault();
    if (!name || !password || !email) {
      setError("Please fill all fields");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    setAuthing(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await auth.signOut();
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already registered. Please use a different email.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setAuthing(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="bg-cover bg-center relative pt-4" style={backgroundStyle}>
      <div className="container mx-auto w-full pt-10 text-white">
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
          <div className="max-w-md w-full mx-auto border rounded-2xl p-8 bg-transparent">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-kameron font-semibold">CREATE ACCOUNT!</h1>
            </div>

            <form className="form" onSubmit={signUpWithEmail}>
              <div className="space-y-5">
                <div>
                  <input
                    name="name"
                    type="text"
                    className="text-gray-800 font-bold bg-white border border-gray-300 w-full text-sm px-4 py-4 rounded-xl outline-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="FULL NAME"
                    aria-label="Name"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    className="text-gray-800 font-bold bg-white border border-gray-300 w-full text-sm px-4 py-4 rounded-xl outline-black pr-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS"
                    aria-label="Email"
                    required
                  />
                  <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
                    <MdEmail />
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
              </div>

              <div className="space-y-4 mt-4 flex flex-col">
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
                      Creating Account...
                    </span>
                  ) : (
                    "SIGN UP"
                  )}
                </button>
                <button
                  type="button"
                  className="w-full flex text-center justify-center items-center py-4 px-4 text-sm tracking-wider font-semibold rounded-xl text-black bg-white hover:bg-black hover:text-white hover:border duration-75 transition-all"
                  onClick={signUpWithGoogle}
                  disabled={authing}
                >
                  <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-4" />
                  <span>Continue with Google</span>
                </button>
              </div>
              <p className="text-white text-sm mt-6 text-center">
                Already have an account?
                <Link to="/login" className="text-red-600 font-semibold hover:underline ml-1">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
