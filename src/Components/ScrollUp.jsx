import { IoMdArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import "../App.css";

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 560);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a href="#" className={`scroll_up ${isVisible ? "show-scroll bg-red-600" : ""}`} aria-label="Back to top">
      <IoMdArrowUp className="scroll_up-icon" />
    </a>
  );
}
