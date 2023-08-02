import axios from "axios";

const axiosCustom = axios.create({
    baseURL: 'http://localhost:8080/api/v1',

    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken')
    }
});

export default axiosCustom