import { BaseUrl } from "./baseUrl";
import { commonApi } from "./commonApi";



// add food 

export const addFoodApi=async(bodyData,headers)=>{
    return await commonApi('post',`${BaseUrl}/api/food/add`,bodyData,headers)
}

// foodList api 


export const foodListApi=async()=>{

   return await commonApi('get',`${BaseUrl}/api/food/list`,{},{})

}

// removeFoodApi 

export const removeFoodApi=async(bodyData)=>{
    return await commonApi('post',`${BaseUrl}/api/food/remove`,bodyData,{})
}


// listOrders Api 


export const listOrderApi=async()=>{
    return await commonApi("get",`${BaseUrl}/api/order/list`,{},{})
}


// status update Api 

export const statusUpdateApi=async(bodyData)=>{
    return await commonApi("post",`${BaseUrl}/api/order/status`,bodyData,{})
}