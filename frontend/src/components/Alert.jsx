const Alert = (props) => {
  const colors = {
    success: "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
    failed: "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800",
  };
  return (
    <div className={`p-4 mb-4 text-base text-center rounded-lg ${props?.success ? colors.success : colors.failed}`} role="alert">
      <span className="font-medium">{props?.message}</span>
    </div>
  );
};

export default Alert;
