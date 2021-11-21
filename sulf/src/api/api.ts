import axios from "axios"

export type UserType = {
    userId: number,
    email: string,
    password: string,
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "869a0d16-5e83-4767-81e8-4a1edcf41cca"
    }
})

export const fakeApi = axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.data;
        })