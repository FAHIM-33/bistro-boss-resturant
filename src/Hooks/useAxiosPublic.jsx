import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://bistro-resturant-server-orpin.vercel.app',
    baseURL: 'http://localhost:5000',
})
const useAxiosPublic = () => {
    return axiosInstance

};

export default useAxiosPublic;