import { useEffect, useState } from "react";

const FormNote = (props) => {
  const [noteID, setNoteID] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    if (props?.note) {
      setNoteID(props.note._id);
      setDate(props.note.date.split("T")[0]);
      setTime(props.note.time);
      setLocation(props.note.location);
      setTemperature(props.note.temperature);
    }
  }, [props?.note]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!noteID) props?.submit({ date, time, location, temperature });
    else props?.submit({ id: noteID, date, time, location, temperature });
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="date" className="formLabel">
          Date
        </label>
        <input type="date" id="date" className="formInput" max={new Date().toISOString().split("T")[0]} onChange={(e) => setDate(e.target.value)} value={date} />
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="formLabel">
          Time
        </label>
        <input type="time" id="time" className="formInput" onChange={(e) => setTime(e.target.value)} value={time} />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="formLabel">
          Location
        </label>
        <input type="text" id="location" className="formInput" onChange={(e) => setLocation(e.target.value)} value={location} />
      </div>
      <div className="mb-3">
        <label htmlFor="temperature" className="formLabel">
          Temperature
        </label>
        <input type="number" id="temperature" className="formInput" onChange={(e) => setTemperature(e.target.value)} value={temperature} />
      </div>
      <button type="submit" className="formButton mt-3">
        Submit
      </button>
    </form>
  );
};

export default FormNote;
