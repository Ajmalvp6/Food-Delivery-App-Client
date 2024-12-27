import { BaseUrl } from "./baseUrl"
import { commonApi } from "./commonApi"





// login api 



export const loginApi=async(bodyData)=>{

    return await commonApi('post',`${BaseUrl}/api/user/login`,bodyData,{})

}


// register api 

export const registerApi=async(bodyData)=>{
    return await commonApi('post',`${BaseUrl}/api/user/register`,bodyData,{})
}


// fetch food api 


export const getFoodApi=async()=>{
    return await commonApi("get",`${BaseUrl}/api/food/list`,{},{})
}


// add to cart 

export const addToCartApi=async(bodyData,headers)=>{
    return await commonApi('post',`${BaseUrl}/api/cart/addtocart`,bodyData,headers)
}

// remove from cart 

export const removeFromCartApi=async(bodyData,headers)=>{
     return await commonApi('post',`${BaseUrl}/api/cart/removefromcart`,bodyData,headers)
}

// get cart 

export const getCartApi=async(headers)=>{

    return await commonApi('get',`${BaseUrl}/api/cart/getcart`,{},headers)

}


// placeorderapi

export const placeOrderApi=async(bodyData,headers)=>{

    return await commonApi("post",`${BaseUrl}/api/order/place`,bodyData,headers)

}

// verifyPaymentApi 

export const verifyPaymentApi=async(bodyData)=>{

    return await commonApi("post",`${BaseUrl}/api/order/verify`,bodyData,{})

}

export const getUserOrdersApi=async(headers)=>{
    return await commonApi("post",`${BaseUrl}/api/order/userorders`,{},headers)
}