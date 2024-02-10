import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundRoute = () => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => (currentCount = currentCount - 1));
    }, 1000);
    // redirect once count is equal to 0
    if (count === 0) navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h5>404 Page not found, Redirecting in {count} second.</h5>
    </div>
  );
};
export default NotFoundRoute;
