import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import isLoggedIn from "../../utils/isLoggedIn";
import Loader from "../../components/Loader";

const RedirectIfLoggedInMiddleware = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        <Navigate to={props?.redirectTo} />
      ) : (
        <React.Fragment>{props.children}</React.Fragment>
      )}
    </>
  );
};

export default RedirectIfLoggedInMiddleware;
