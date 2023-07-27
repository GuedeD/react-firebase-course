import Auth from "./components/Auth";
import "./App.css";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);

  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");
  console.log(auth?.currentUser?.email);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      // console.log(data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  async function onSubmitMovie(e) {
    e.preventDefault();
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMovie(id) {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  }

  async function updateMovieTitle(id, e) {
    e.preventDefault();
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  }

  async function uploadFile(e) {
    e.preventDefault();
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className='App'>
      <Auth />

      <br />
      <form onSubmit={onSubmitMovie}>
        <input
          placeholder='Movie title...'
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder='Release Date...'
          type='number'
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input type='submit' value='Submit Movie' />
      </form>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p> Date: {movie.releaseDate} </p>
            <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>

            <form onSubmit={(e) => updateMovieTitle(movie.id, e)}>
              <input
                placeholder='new title...'
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <input type='submit' value='Update Title' />
            </form>
          </div>
        ))}
      </div>

      <form onSubmit={uploadFile}>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
        <input type='submit' value='Upload File' />
      </form>
    </div>
  );
};

export default App;
