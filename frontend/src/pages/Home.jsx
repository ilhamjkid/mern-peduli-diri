import MainLayout from "../components/MainLayout";

const Home = () => {
  return (
    <MainLayout active="home">
      <div className="w-full h-auto lg:h-[90vh] lg:overflow-auto p-4 lg:pl-0 md:flex lg:flex-col lg:order-2">
        <div className="block p-6 md:mx-2 lg:mx-0 w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-xl lg:text-3xl text-center font-bold text-gray-900 dark:text-white">Welcome to Dashboard</h1>
            <h2 className="text-4xl lg:text-8xl text-center font-normal text-gray-800 dark:text-gray-400">Peduli Diri</h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
