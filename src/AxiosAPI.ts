import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://zee-server-924e5-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;