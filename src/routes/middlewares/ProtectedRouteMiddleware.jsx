import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";
import Loader from "../../components/Common/Loader";

const AuthMiddleware = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const unProtectedAllowedRoutes = ['/login','/signup'];
  
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const loginStatus = await isLoggedIn();
        if (loginStatus) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isAuthenticated ? ( 
        props.path == '/dashboard' ? 
        <React.Fragment>{props.children}</React.Fragment>
        : <Navigate to="/dashboard" />
      ) : ( 
        unProtectedAllowedRoutes.indexOf(props.path) !== -1 ?
        <React.Fragment>{props.children}</React.Fragment>
         : <Navigate to="/login" />
      )}
    </>
  );
};

export default AuthMiddleware;
