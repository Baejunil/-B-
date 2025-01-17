import axios from 'axios';

const baseURL = 'http://localhost:8081/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('signup', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await axiosInstance.post('login', loginData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
