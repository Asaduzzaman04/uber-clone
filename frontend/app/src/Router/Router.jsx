import { BrowserRouter, Routes, Route } from "react-router";
import Root from "../Layout/Root";
import ErrorPage from "../components/ErrorPage";
import Home from "../pages/Home";
import Role from "../pages/Role/Role";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
          {/* Child Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/select-role" element={<Role />} />
          <Route path="/select-role" element={<Role />} />
          <Route path="/select-role" element={<Role />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
