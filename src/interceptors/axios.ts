import axios from 'axios';
axios.interceptors.request.use(
    config => {
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            const token = user?.idToken?.jwtToken;
            if (token) {
                config.headers['Authorization'] = 'bearer ' + token;
            }
        }

        return config;
    },
    error => {
        Promise.reject(error)
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            window.location.href = '/login';
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
)