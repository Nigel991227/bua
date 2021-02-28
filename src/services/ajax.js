import axios from "axios";

axios.defaults.baseURL = "https://www.gongjubaike.cn/api/v1";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";


axios.interceptors.request.use(request => {
    request.headers["GGM"] ="gg1"; // 添加请求头
    return request;
})




//返回值解构
axios.interceptors.response.use(response => {
    let data = response.data;
    console.log(data);
    let isJson = (response.headers["content-type"] || "").includes("json");
    if (isJson) {
        if (response.status === 200) {
            return Promise.resolve({
                data: data.data,
                msg: data.msg,
                code: data.code,
            });
        }
        return Promise.reject(
            data.msg ||
            "网络错误"
        );
    } else {
        return data;
    }
}, err => {
    let isCancel = axios.isCancel(err);
    if (isCancel) {
        return new Promise(() => { });
    }
    return Promise.reject(
        err&&
        '网络错误'
    );
})

export function post(url, data, otherConfig) {
    return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
    return axios.get(url, { params: data, ...otherConfig });
}