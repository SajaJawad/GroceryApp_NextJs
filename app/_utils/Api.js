import axios from "axios";
const axiosGlobal = axios.create({
    baseURL: "http://localhost:1337/api"
})

const getCategory = () => axiosGlobal.get("/categories?populate=*")


const getSlider = () => axiosGlobal.get("/sliders?populate=*").then(resp => {
    return resp.data.data
})


const getCategoryList = () => axiosGlobal.get("/categories?populate=*").then(resp => {
    return resp.data.data
})


const getProductList = () => axiosGlobal.get("/products?populate=*").then(resp => {
    return resp.data.data
})

export default { getCategory, getSlider , getCategoryList, getProductList }