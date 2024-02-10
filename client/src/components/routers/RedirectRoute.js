import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = () => {
  const [count, setCount] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => (currentCount = currentCount - 1));
    }, 1000);
    // redirect once count is equal to 0
    if (count === 0) navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h5>Please login. Redirecting in {count} second.</h5>
    </div>
  );
};
export default RedirectRoute;
