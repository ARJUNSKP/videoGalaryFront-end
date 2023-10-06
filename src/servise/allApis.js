//import baseurl
import { BASE_URL } from "./baseurl";
import { commonrequest } from "./commonrequesr";

// video add api :-post :-{url,body}
export const addvideo=async (body)=>{
   return await commonrequest("post",`${BASE_URL}/videos`,body)
}

// get all videos :-get :-{url,""//nobody}
export const getAllVideos=async ()=>{
   return await commonrequest("get",`${BASE_URL}/videos`,"")
}

// add categoty :-post :-{url,body}
export const addCategory = async (body)=>{
    return await commonrequest("POST",`${BASE_URL}/carogory`,body)
}
// video delete :-delete :-{url,{}}
export const removevieo=async (id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}

export const allCategory=async()=>{
    return await commonrequest('get',`${BASE_URL}/carogory`,"")
}
export const removiecatogory=async (id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carogory/${id}`,{})
}
export const historydata=async()=>{
    return await commonrequest('get',`${BASE_URL}/histories`,"")
}
export const addHistory=async(body)=>{
    return await commonrequest('POST',`${BASE_URL}/histories`,body)
}


// drag and drop
// api to get video data
export const getVideo=async(id)=>{
    return await commonrequest("Get",`${BASE_URL}/videos/${id}`,{})
}
// api to update catogory array
export const updateCategory=async(id,body)=>{
    return await commonrequest("PATCH",`${BASE_URL}/carogory/${id}`,body)
}