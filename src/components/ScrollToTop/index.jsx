import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className="scroll-to-top"
      style={{
        position: "fixed",
        bottom: "80px",
        right: "20px",
        color: "white",
        zIndex:"1"
      }}
    >
      {isVisible && (
        <div onClick={scrollToTop}>
          <div style={{backgroundColor:"#4c48be", borderRadius:"50%", padding:"5px"}}>
            <ArrowUpwardIcon />
          </div>
        </div>
      )}
    </div>
  );
}
