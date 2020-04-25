import axios from 'axios';

//Set baseURL at one place
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/"
});

export default axiosInstance;