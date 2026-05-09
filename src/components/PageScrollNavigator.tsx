import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const order = ["/", "/models", "/games", "/software", "/research", "/book", "/resume", "/blog", "/gallery"];

export function PageScrollNavigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathRef = useRef(location.pathname);

  useEffect(() => {
    pathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    let lock = false;
    const onWheel = (event: WheelEvent) => {
      if (lock || Math.abs(event.deltaY) < 24) return;
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
      const nearTop = window.scrollY <= 12;
      const current = order.indexOf(pathRef.current);
      if (current < 0) return;

      if (event.deltaY > 0 && nearBottom && current < order.length - 1) {
        lock = true;
        navigate(order[current + 1]);
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
        window.setTimeout(() => {
          lock = false;
        }, 900);
      }

      if (event.deltaY < 0 && nearTop && current > 0) {
        lock = true;
        navigate(order[current - 1]);
        requestAnimationFrame(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }));
        window.setTimeout(() => {
          lock = false;
        }, 900);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  return null;
}
