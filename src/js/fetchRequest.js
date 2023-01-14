import Notiflix from 'notiflix';
import axios from "axios";

async function fetchRequest(value, page = 1, limit) {
  const BASE_URL = 'https://pixabay.com/api';
  const KEY = '32770408-8982991443e7036be1a407989';
  
    try {
      const response = await axios.get(`${BASE_URL}/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limit}`);
      const { data } = await response;
      return await data;
    } catch (error) {
        Notiflix.Notify.failure(error);
    }
}

export { fetchRequest };