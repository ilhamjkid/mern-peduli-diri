import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RecentNote from "./RecentNote";

const MainLayout = (props) => {
  const { user } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen bg-gray-200 dark:bg-gray-700 md:px-0">
      <Navbar active={props.active} />
      <div className="w-full h-auto lg:flex lg:justify-between">
        {props.children}
        <div className="w-full lg:max-w-sm h-auto lg:h-[90vh] lg:overflow-auto p-4 md:flex lg:flex-col lg:order-1">
          <div className="block p-6 md:mx-2 lg:mx-0 mb-4 md:mb-0 lg:mb-4 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="w-4/5 h-auto bg-gray-200 dark:bg-gray-700 mx-auto mb-2 rounded-full overflow-hidden">
              <svg className="w-full h-auto" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="fill-gray-900 dark:fill-gray-200"
                  d="M702.062 680.906V761.531C702.062 794.915 674.978 822 641.594 822H581.125V761.531C581.125 750.445 572.055 741.375 560.969 741.375C549.883 741.375 540.812 750.445 540.812 761.531V822H460.188V761.531C460.188 750.445 451.117 741.375 440.031 741.375C428.945 741.375 419.875 750.445 419.875 761.531V822H359.406C326.022 822 298.938 794.915 298.938 761.531V680.906C298.938 680.402 298.938 680.024 298.95 679.521C225.216 627.744 178 548.253 178 459.188C178 303.354 322.369 177 500.5 177C678.631 177 823 303.354 823 459.188C823 548.253 775.759 627.744 700.929 679.521C700.929 680.024 702.062 680.402 702.062 680.906ZM379.562 418.875C335.093 418.875 298.938 455.03 298.938 499.5C298.938 543.97 335.093 580.125 379.562 580.125C424.032 580.125 460.188 543.97 460.188 499.5C460.188 455.03 424.032 418.875 379.562 418.875ZM621.438 580.125C665.907 580.125 702.062 543.97 702.062 499.5C702.062 455.03 665.907 418.875 621.438 418.875C576.968 418.875 540.812 455.03 540.812 499.5C540.812 543.97 576.968 580.125 621.438 580.125Z"
                />
              </svg>
            </div>
            <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">{user?.name}</h5>
            <p className="font-normal text-center text-gray-700 dark:text-gray-400">{user?.nik}</p>
          </div>
          <div className="block p-6 md:mx-2 lg:mx-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <RecentNote />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default MainLayout;
