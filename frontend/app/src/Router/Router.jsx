import { BrowserRouter, Routes, Route } from "react-router";
import Root from "../Layout/Root";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/Home";
import RoleSelection from "./../pages/Role/RoleSelection";
import Captainlogin from "../pages/Captain/Captainlogin";
import UserLogin from "../pages/User/UserLogin";
import UserSignUp from "../pages/User/UserSignUp";
import CaptainSignUp from "../pages/Captain/CaptainSignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          {/* selection-routes */}
          <Route path="select-role" element={<RoleSelection />} />
          {/* login-register-releted-client-routes */}
          <Route path="login-client" element={<UserLogin />} />
          <Route path="register-client" element={<UserSignUp />} />
          {/* login-register-releted-captain-routes */}
          <Route path="login-captain" element={<Captainlogin />} />
          <Route path="register-captain" element={<CaptainSignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
