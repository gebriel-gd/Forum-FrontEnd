import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://aware-jade-starfish.cyclic.app/api/users", // Set your base URL
});

export default axiosInstance;
