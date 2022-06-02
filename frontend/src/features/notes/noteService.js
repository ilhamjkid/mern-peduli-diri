import axios from "axios";

const URL = "http://localhost:5000/api/notes/";
const TOKEN_URL = "http://localhost:5000/api/users/refresh/";

const getNotes = async () => {
  const responseToken = await axios.get(TOKEN_URL);
  const token = responseToken.data.accessToken;
  const response = await axios.get(URL, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const createNote = async (note) => {
  const responseToken = await axios.get(TOKEN_URL);
  const token = responseToken.data.accessToken;
  const response = await axios.post(URL, note, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateNote = async (id, note) => {
  const responseToken = await axios.get(TOKEN_URL);
  const token = responseToken.data.accessToken;
  const response = await axios.put(URL + id, note, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteNote = async (id) => {
  const responseToken = await axios.get(TOKEN_URL);
  const token = responseToken.data.accessToken;
  const response = await axios.delete(URL + id, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getSingleNote = async (id) => {
  const responseToken = await axios.get(TOKEN_URL);
  const token = responseToken.data.accessToken;
  const response = await axios.get(URL + id, {
    headers: { authorization: `Bearer ${token}` },
  });
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getSingleNote,
};
export default noteService;
