import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CarouselNavigation = ({ onPrevious, onNext }) => {
  return (
    <>
      <button onClick={onPrevious} className="absolute top-1/2 -translate-y-1/2 p-3 text-gray-500 hover:text-white transition-all transform duration-300 ease-out hover:translate-x-1 active:scale-95 z-10" aria-label="Previous">
        <IoIosArrowBack className="w-3 h-3" />
      </button>

      <button onClick={onNext} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-gray-500 hover:text-white transition-all transform duration-300 ease-out hover:-translate-x-1 active:scale-95 z-10" aria-label="Next">
        <IoIosArrowForward className="w-3 h-3" />
      </button>
    </>
  );
};

export default CarouselNavigation;
