import axios from 'axios';

const request=axios.create({
    baseURL:'https://cloudmusicapi-98aggmwl4-sssome1.vercel.app'
})

request.interceptors.request.use((config)=>{
    return config
},(error)=>{
    return Promise.reject(error)
})
request.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    return Promise.reject(error)
})

export default request
