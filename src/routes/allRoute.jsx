
import Signup from "../components/Signup";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard/Dashboard";



const authRoutes = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
];

const protectedRoutes = [
  { path: "/dashboard", element: <Dashboard /> },
];

export { protectedRoutes, authRoutes };
