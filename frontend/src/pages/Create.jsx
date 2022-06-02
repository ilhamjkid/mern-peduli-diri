import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNote, reset } from "../features/notes/noteSlice";
import MainLayout from "../components/MainLayout";
import FormNote from "../components/FormNote";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

const Create = () => {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.note);

  useEffect(() => {
    if (isSuccess) {
      setResponse({ status: true, message });
      setTimeout(() => navigate("/notes"), 2000);
    }

    if (isError) setResponse({ status: false, message });

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch, navigate]);

  const submitHandler = (data) => {
    dispatch(createNote(data));
  };

  if (isLoading) return <Loading />;

  return (
    <MainLayout active="create">
      <div className="w-full h-[90vh] p-4 lg:pl-0 md:flex lg:flex-col lg:order-2">
        <div className="block p-6 md:mx-2 lg:mx-0 w-full h-full overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {response ? <Alert success={response.status} message={response.message} /> : ""}
          <FormNote submit={submitHandler} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Create;
