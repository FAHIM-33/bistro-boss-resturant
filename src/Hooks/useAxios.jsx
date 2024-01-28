import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://bistro-resturant-server-orpin.vercel.app',
    baseURL: 'http://localhost:5000',
});

const useAxios = () => {

    // Request interceptoop to add authorization to header
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('req stopped by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    instance.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    }, function (error) {
        console.log('status error: error in getting response')
        const status = error?.response?.status
        console.log("caught status: ", status)
        if (status === 401 || status === 403) {
            // logOutUser()
            //     .then(() => nav('/login'))

        }
        return Promise.reject(error);
    });



    return instance
};

export default useAxios;
