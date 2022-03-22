import { axios } from 'tina-weapp'

const instance = axios.create({
    baseURL: 'https://www.test.com/api/',
    timeout: 10000
})

//请求拦截
instance.interceptors.request.use(
    config => {
        config.headers['token'] = 'myToken'
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error)
    }
)

//响应拦截
instance.interceptors.response.use(
    response => {
       if (response.data.code == 1) {
           console.log(response.data.msg)
       }
       return response
    },
    error => {
        console.warn(error)
        return Promise.reject(error)
    }
)

export default instance