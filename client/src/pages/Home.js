import React from "react";
import { useAuth } from "../context/auth";

function Home() {
  const [auth, setAuth] = useAuth();
  return <h1>Home</h1>;
}

export default Home;
