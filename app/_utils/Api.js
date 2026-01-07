import axios from "axios";
const axiosGlobal = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:1337/api"
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
        // Handle Strapi 5 flattened structure vs deeper population
        const image = product?.image?.[0] || product?.image;
        const imageUrl = image?.url;

        return {
            name: product?.name,
            quantity: item?.quantity,
            amount: item?.amount,
            image: imageUrl,
            sellingPrice: product?.sellingPrice || product?.sillingPrice || product?.realPrice,
            id: item.documentId || item.id,
            product: product?.documentId || product?.id
        }
    })

})



const createOrder = (data, jwt) => axiosGlobal.post("/orders", data, {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
})

const getMyOrders = (userId, jwt) => axiosGlobal.get("/orders?filters[userId][$eq]=" + userId + "&populate=orderItemList", {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
}).then(resp => {
    const data = resp.data.data;
    if (!data) return [];
    return data.map(item => ({
        id: item.id,
        totalOrderAmount: item.totalOrderAmount,
        orderItemList: item.orderItemList,
        createdAt: item.createdAt
    }))
})

const deleteCartItem = (id, jwt) => axiosGlobal.delete("/user-carts/" + id, {
    headers: {
        Authorization: `Bearer ${jwt}`
    }
})


export default { getCategory, getSlider, getCategoryList, getProductList, getProductByCategory, registerUser, signIn, addToCart, getCartItems, createOrder, getMyOrders, myOrders: getMyOrders, deleteCartItem }