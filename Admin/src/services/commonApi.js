import axios from "axios"




export const commonApi=async(method,url,bodyData,headers)=>{
    const config={
        method,
        url,
        data:bodyData,
        headers:headers?headers : {
            "content-type":"application/json"
        }
        
    }
    return await axios(config).then(result=>{
        return result
    })
    .catch(error=>{
        return error
    })
}