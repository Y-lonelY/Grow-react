import Axios from "axios";

const service = Axios.create({
    baseURL: "/service/",
    timeout: 4000,
})

export default service;