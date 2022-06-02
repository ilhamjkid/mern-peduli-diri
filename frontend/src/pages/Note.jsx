import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, reset } from "../features/notes/noteSlice";
import MainLayout from "../components/MainLayout";
import Loading from "../components/Loading";
import TableNotes from "../components/TableNotes";
import ConfirmBox from "../components/ConfirmBox";
import Alert from "../components/Alert";

const Note = () => {
  const [noteID, setNoteID] = useState(null);
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();

  const { notes, isLoading, isSuccess, isError, message } = useSelector((state) => state.note);

  useEffect(() => {
    if (isSuccess) {
      setResponse({ status: true, message });
      setTimeout(() => setResponse(null), 2000);
    }

    if (isError) {
      setResponse({ status: false, message });
      setTimeout(() => setResponse(null), 2000);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);

  const deleteHandler = (del) => {
    if (del) dispatch(deleteNote(noteID));
    setNoteID(null);
  };

  if (isLoading) return <Loading />;

  return (
    <MainLayout active="notes">
      {noteID ? <ConfirmBox confirm={deleteHandler} /> : ""}
      <div className="w-full h-[90vh] p-4 lg:pl-0 md:flex lg:flex-col lg:order-2">
        <div className="block p-6 md:mx-2 lg:mx-0 w-full h-full overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {response ? <Alert success={response.status} message={response.message} /> : ""}
          {notes?.length > 0 ? (
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <TableNotes notes={notes} deleteNote={setNoteID} />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="text-8xl mb-2">😒</div>
              <div className="text-gray-900 dark:text-white text-3xl font-medium">Note Empty</div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Note;
