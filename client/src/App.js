import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/nav/Main";
import { Toaster } from "react-hot-toast";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassworld from "./pages/auth/ForgotPassworld";
import AccessAccount from "./pages/auth/AccessAccount";
import DashBoard from "./pages/user/DashBoard";
import AdCreate from "./pages/user/ad/AdCreate";
import PrivateRoute from "./components/routers/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/account-activate/:token" element={<AccountActivate />} />
          <Route path="/auth/forgot-password" element={<ForgotPassworld />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="ad/create" element={<AdCreate />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
