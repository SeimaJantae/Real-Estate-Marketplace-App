import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
function Main() {
  // context
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/");
  };

  const loggedIn = auth.user != null && auth.token !== "" && auth.refreshToken !== "";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          REMP
        </NavLink>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor04"
          aria-controls="navbarColor04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="navbarColor04" style={{}}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            {loggedIn ? (
              <>
                <li className="nav-item pointer">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}

            {!loggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          {loggedIn ? (
            <>
              {" "}
              <div className="dropdown mx-5">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {auth?.user?.name ? auth.user.name : auth.user.username}
                </a>
                <div className="dropdown-menu">
                  <a onClick={logout} className="dropdown-item">
                    Logout
                  </a>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Main;
