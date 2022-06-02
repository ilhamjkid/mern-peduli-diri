import ToggleMode from "./ToggleMode";

const Footer = () => {
  return (
    <footer className="w-full h-auto pt-4 pb-8 flex flex-wrap justify-center items-center">
      <div className="w-full h-auto text-center text-gray-900 dark:text-white font-medium">
        <h4 className="text-xl mb-1">Copyright ©️ 2022</h4>
        <h5 className="text-lg mb-1">Peduli Diri</h5>
      </div>
      <div className="bg-white dark:bg-gray-800 pt-4 pb-2 px-4 rounded-lg shadow-md">
        <ToggleMode />
      </div>
    </footer>
  );
};

export default Footer;
