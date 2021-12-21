import axios, { AxiosRequestConfig } from "axios";

export const $hostapi = axios.create({
	baseURL: `https://sulfur-tech-edu.herokuapp.com/`,
});

export const $api = axios.create({
	baseURL: `https://sulfur-tech-edu.herokuapp.com/`,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
    //@ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
