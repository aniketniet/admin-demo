import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const permissions = Cookies.get("permissions");
  console.log("permissions", permissions);
  const currentRoute = useLocation().pathname;
  console.log("currentRoute", currentRoute);

  const route = currentRoute.split("/")[1];

  console.log("route", route);

  // console.log("currentRoute", route);

  const accessArray = JSON.parse(permissions);
  console.log("accessArray", accessArray);
  const accessRoutes = accessArray.map((route) => `/${route}`);
  console.log("accessRoutes", accessRoutes);

  const hasAccess = accessRoutes.includes(`/${route}`);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (!hasAccess) {
      navigate("/");
    }
  }, [token, navigate, hasAccess]);

  // If token exists, render children; otherwise, return null until redirect happens
  return token && hasAccess ? children : null;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
