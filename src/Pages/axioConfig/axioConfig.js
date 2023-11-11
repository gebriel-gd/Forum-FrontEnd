import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://aware-jade-starfish.cyclic.app/api/users", // Set your base URL
});

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api/users", // Set your base URL
// });

export default axiosInstance;
