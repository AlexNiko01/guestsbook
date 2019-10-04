import Axios from "axios"


class Auth {

    constructor() {
        this.token = null;
        this.userId = null;
        this.init();
        this.me();
    }

    init() {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token != null) {
            this.token = token.access_token;
        }
    }

    me() {
        let token = this.getToken();
        if (token) {
            let headers = {
                headers: {'Authorization': 'Bearer ' + token}
            };
            return Axios.post('http://guestbook-api.dev.local/api/me',
                {}, headers).then((response) => {
                let data = response.data;
                if (data.data && data.data.id) {
                    this.userId = response.data.data.id;
                }
            })
                .catch((error) => console.log(error.response.data))
        }

    }

    login(data) {
        return Axios.post('http://guestbook-api.dev.local/api/login', data).then((response) => {
            console.log(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            window.location.href = 'profile';
        })
            .catch((error) => console.log(error.response.data))
    }

    signup(data) {
        return Axios.post('http://guestbook-api.dev.local/api/signup', data).then((response) => {
            console.log(response.data);
            localStorage.setItem('token', JSON.stringify(response.data));
            window.location.href = 'profile';
        })
            .catch((error) => console.log(error.response.data))
    }

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    getToken() {
        return this.token;
    }

    isLoggedIn() {
        return !!this.token;
    }

}

const auth = new Auth();
export default auth;
