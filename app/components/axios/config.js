import axios from axios

const instance = axios.create({
    baseURL: 'https://chat-app-toluwaa-o.vercel.app/api'
})

export default instance