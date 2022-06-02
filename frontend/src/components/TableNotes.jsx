import { Link } from "react-router-dom";

const TableNotes = (props) => {
  const { notes, deleteNote } = props;
  return (
    <table className="w-full text-left text-gray-500 dark:text-gray-400">
      <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Time
          </th>
          <th scope="col" className="px-6 py-3">
            Location
          </th>
          <th scope="col" className="px-6 py-3">
            Temperature
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
            <span className="sr-only">Delete</span>
          </th>
        </tr>
      </thead>
      <tbody className="text-base">
        {notes.map((note) => {
          return (
            <tr key={note._id} className="odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {note.date.split("T")[0]}
              </th>
              <td className="px-6 py-4">{note.time}</td>
              <td className="px-6 py-4">{note.location}</td>
              <td className="px-6 py-4">{note.temperature} Celcius</td>
              <td className="px-6 py-4 text-right">
                <Link to={`/notes/update/${note._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </Link>
                {"  "}
                <span
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableNotes;
