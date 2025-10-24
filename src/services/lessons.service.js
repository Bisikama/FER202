import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;

const getLessons = async () => {
  try {
    const resp = await axios.get(baseURL);
    return resp;
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
 
}


const getCompletedLessons = async () => {
  try {
    const resp = await axios.get(baseURL +"?isCompleted=true");
    return resp;
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
 
}

const getDetailLessons = async (id) => {
  try {
    const resp = await axios.get(baseURL + `/${id}`);
    return resp;
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
 
}

const deleteLessons = async (id) => {
  try {
    const resp = await axios.delete(`${baseURL}/${id}`);
    return resp;
  } catch (error) {
    console.error("Error deleting lessons:", error);
  }

}

const createLessons = async (lessonData) => {
  try {
    const resp = await axios.post(baseURL, lessonData);
    return resp;
  } catch (error) {
    console.error("Error adding lessons:", error);
  }
}


export { getLessons ,getCompletedLessons,getDetailLessons, deleteLessons, createLessons}; 