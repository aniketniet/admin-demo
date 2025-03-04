import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const permissions = Cookies.get("permissions");

  const currentRoute = useLocation().pathname;
  const route = currentRoute.split("/")[1];

  let hasAccess = false;
  
  if (permissions) {
    try {
      const accessArray = JSON.parse(permissions);
      const accessRoutes = accessArray.map((r) => `/${r}`);
      hasAccess = accessRoutes.includes(`/${route}`);
    } catch (error) {
      console.error("Error parsing permissions", error);
    }
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else if (!hasAccess) {
      navigate("/unauthorized");
    }
  }, [token, hasAccess, navigate]);

  return token && hasAccess ? children : null;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
