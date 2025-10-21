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
export { getLessons ,getCompletedLessons};