import axios from "axios";

const axiosCustom = axios.create({
    baseURL: 'http://localhost:8080/api/v1',

    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        maxContentLength: 100000000000000000n,
        maxBodyLength: 10000000000000000000n
    }
});

export default axiosCustom