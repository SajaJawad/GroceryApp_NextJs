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

// const getProductByCategory = (category) => 
//   axiosGlobal
//     .get(`/products?filters[categories][name][$in]=${encodeURIComponent(category)}&populate=*`)
//     .then(resp => resp.data.data);

export const getProductByCategory = (category) =>
    axiosGlobal
        .get(`/products?filters[categories][name][$containsi]=${encodeURIComponent(category)}&populate=*`)
        .then(resp => resp.data.data)


const registerUser = (username, email, password) => axiosGlobal.post("/auth/local/register", {
    username: username,
    email: email,
    password: password
})


const signIn = (email, password) => axiosGlobal.post("/auth/local", {
    identifier: email,
    password: password
})


const addToCart = (data, jwt) => axiosGlobal.post("/user-carts", data, {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
})


const getCartItems = (userId, jwt) => axiosGlobal.get("/user-carts?filters[users_permissions_user][id][$eq]=" + userId + "&populate[products][populate][image][populate]=*&t=" + Date.now(), {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
}).then(resp => {
    const data = resp.data.data;
    if (!data) return [];
    
    return data.map((item) => {
        const product = item?.products?.[0]; 
        // Handle cases where image might be in data[0] or attributes
        const imageUrl = product?.image?.[0]?.url || product?.image?.url;

        return {
            name: product?.name,
            quantity: item?.quantity,
            amount: item?.amount,
            image: imageUrl,
            sellingPrice: product?.sillingPrice || product?.sellingPrice || product?.realPrice,
            id: item.id,
            product: product?.documentId || product?.id
        }
    })
})

export default { getCategory, getSlider, getCategoryList, getProductList, getProductByCategory, registerUser, signIn, addToCart , getCartItems }