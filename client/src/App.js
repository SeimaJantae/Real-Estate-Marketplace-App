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
import PrivateRoute from "./components/routers/PrivateRoute";
import AdCreate from "./pages/user/ad/AdCreate";
import SellHouse from "./pages/user/ad/SellHouse";
import SellLand from "./pages/user/ad/SellLand";
import RentHouse from "./pages/user/ad/RentHouse";
import RentLand from "./pages/user/ad/RentLand";
import AdView from "./pages/AdView";
import Footer from "./components/nav/Footer";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";
import AdEdit from "./pages/user/ad/AdEdit";
import Wishlist from "./pages/user/ad/Wishlist";
import Enquiries from "./pages/user/ad/Enquiries";
import NotFoundRoute from "./components/routers/NotFoundRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main />
        <Toaster />
        <div className="content">
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
              <Route path="ad/create/sell/house" element={<SellHouse />} />
              <Route path="ad/create/sell/land" element={<SellLand />} />
              <Route path="ad/create/rent/house" element={<RentHouse />} />
              <Route path="ad/create/rent/land" element={<RentLand />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/settings" element={<Settings />} />
              <Route path="user/ad/:slug" element={<AdEdit />} />
              <Route path="user/wishlist" element={<Wishlist />} />
              <Route path="user/enquires" element={<Enquiries />} />
            </Route>
            <Route path="/ad/:slug" element={<AdView />} />
            <Route path="*" element={<NotFoundRoute />} />
          </Routes>
        </div>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
