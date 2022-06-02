import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, reset } from "../features/notes/noteSlice";
import Loading from "./Loading";

const RecentNote = () => {
  const dispatch = useDispatch();

  const { notes, isLoading } = useSelector((state) => state.note);

  useEffect(() => {
    if (!notes) dispatch(getNotes());

    dispatch(reset());
  }, [notes, dispatch]);

  if (isLoading) return <Loading />;

  if (notes?.length > 0) {
    return (
      <>
        <p className="font-normal text-gray-700 dark:text-gray-400">Recent notes</p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Date : <span className="text-base font-semibold text-gray-700 dark:text-gray-400">{notes[notes.length - 1].date.split("T")[0]}</span>
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Time : <span className="text-base font-semibold text-gray-700 dark:text-gray-400">{notes[notes.length - 1].time}</span>
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Location : <span className="text-base font-semibold text-gray-700 dark:text-gray-400">{notes[notes.length - 1].location}</span>
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Temperature : <span className="text-base font-semibold text-gray-700 dark:text-gray-400">{notes[notes.length - 1].temperature} °C</span>
        </h5>
      </>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="text-8xl mb-2">😒</div>
        <div className="text-gray-900 dark:text-white text-3xl font-medium">Note Empty</div>
      </div>
    );
  }
};

export default RecentNote;
