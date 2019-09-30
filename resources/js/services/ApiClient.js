import Axios from "axios"

export default function (auth) {
    let jwtToken = auth.getToken();
    const axios = Axios.create({
        baseURL: 'http://guestbook-api.dev.local/api',
        headers: {'Authorization': 'Bearer ' + jwtToken}
    });
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            auth.logout();
            // window.location = '/login';
        } else {
            return Promise.reject(error);
        }
    });
    return axios;
}
