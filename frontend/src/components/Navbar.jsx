import { useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../features/users/userSlice";
import Loading from "./Loading";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!Cookies.get("aflog") && !user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, navigate, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const showBar = () => {
    const bar = document.querySelector("#mobile-menu");
    bar.classList.toggle("hidden");
  };
  const hideBar = () => {
    const bar = document.querySelector("#mobile-menu");
    bar.classList.add("hidden");
  };

  if (isLoading) return <Loading />;

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800 shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">Peduli Diri</span>
        </Link>
        <div className="flex md:order-2">
          <button type="button" onClick={logoutHandler} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Logout
          </button>
          <button onClick={showBar} data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium">
            <li>
              <Link to="/" className={props.active === "home" ? "navlink-active" : "navlink-unactive"} onClick={hideBar}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/notes" className={props.active === "notes" ? "navlink-active" : "navlink-unactive"} onClick={hideBar}>
                Notes
              </Link>
            </li>
            <li>
              <Link to="/notes/create" className={props.active === "create" ? "navlink-active" : "navlink-unactive"} onClick={hideBar}>
                Create
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
