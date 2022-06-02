import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset, login } from "../features/users/userSlice";
import ToggleMode from "../components/ToggleMode";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

const Login = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (Cookies.get("aflog") || user) navigate("/");

    dispatch(reset());
  }, [user, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = { nik, password };
    dispatch(login(userData));
  };

  if (isLoading) return <Loading />;

  return (
    <section className="w-full min-h-screen bg-gray-200 dark:bg-gray-700 px-4 md:px-0 flex justify-center items-center">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        {isError ? <Alert success={false} message={message} /> : ""}
        <form className="space-y-4 mb-4" onSubmit={submitHandler}>
          <h5 className="text-2xl font-medium text-center text-gray-900 dark:text-white">Login</h5>
          <div className="relative z-0">
            <input type="number" id="nik" className="floatingInput peer" placeholder=" " onChange={(e) => setNik(e.target.value)} value={nik} autoFocus />
            <label htmlFor="nik" className="floatingLabel">
              No. NIK
            </label>
          </div>
          <div className="relative z-0">
            <input type="password" id="password" className="floatingInput peer" placeholder=" " onChange={(e) => setPassword(e.target.value)} value={password} />
            <label htmlFor="password" className="floatingLabel">
              Password
            </label>
          </div>
          <button type="submit" className="btnFormAuth">
            Submit
          </button>
          <div className="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">
              Register now
            </Link>
          </div>
        </form>
        <div className="w-full h-auto flex justify-center">
          <ToggleMode />
        </div>
      </div>
    </section>
  );
};

export default Login;
