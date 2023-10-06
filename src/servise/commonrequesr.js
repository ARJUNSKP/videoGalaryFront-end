// import axios
import axios from "axios";

// api structure
export const commonrequest=async (method,url,body)=>{
    let requestConfig={
        method,
        url,
        data:body
    }
    return await axios (requestConfig).then(result=>{
        return result
    }).catch(error=>{
        return error
    })
}