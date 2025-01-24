import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-gray-500 text-2xl py-8">Movie not found</h2>
        <Link to="/" className="bg-transparent border-2 border-red-600 hover:bg-red-600 text-white py-2 px-4 rounded">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
