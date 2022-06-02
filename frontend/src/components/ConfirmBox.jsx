const ConfirmBox = (props) => {
  return (
    <div className="w-full fixed top-0 left-0 z-[99999] flex justify-center items-start">
      <div className="p-6 mt-20 w-full max-w-sm overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-wrap justify-between items-center">
        <h4 className="text-gray-900 dark:text-white text-xl font-medium">Sure ?</h4>
        <div>
          <button type="button" onClick={() => props?.confirm(false)} className="buttonAlt mr-2">
            Cancel
          </button>
          <button type="button" onClick={() => props?.confirm(true)} className="buttonPrimary">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
