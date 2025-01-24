import { useNavigate } from "react-router-dom";
export default function Card({ id, title, image, year }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${id}`, "_blank");
  };
  return (
    <div className="w-full p-1" onClick={handleClick}>
      <div className="flex items-center w-full bg-gray-500 p-4 rounded-lg cursor-pointer">
        <div className="flex-shrink-0">
          <img className="h-20 w-20 object-cover rounded" src={image} alt={title} />
        </div>
        <div className="flex-grow ml-4 text-left">
          <h5 className="text-base font-medium text-gray-300">{title}</h5>
          <p className="text-xs text-neutral-300">{year}</p>
        </div>
      </div>
    </div>
  );
}
