import axios from "axios";

import{
    ALL_POST_FAIL,
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,NEW_POST_FAIL,NEW_POST_REQUEST,NEW_POST_SUCCESS,NEW_POST_RESET,
    CLEAR_ERRORS,POST_DETAILS_FAIL,POST_DETAILS_SUCCESS,POST_DETAILS_REQUEST,CURRENT_GROUP_ID 
}from "../constants/postConstants";

export const currentGroup=(currentGroupID="61f6339a79da0e82b057b898")=>async(dispatch)=>{
    dispatch({type:CURRENT_GROUP_ID,
    payload:currentGroupID})
}



export const getPost=(keyword="",currentGroup="61f6339a79da0e82b057b898",currentPage=1,category)=>async(dispatch)=>{
    try{
     
    //    console.log(currentGroup)
        dispatch({type:ALL_POST_REQUEST});
        // const {data}="hii";
        let link = `http://localhost:4000/api/v1/${currentGroup}/posts?keyword=${keyword}&page=${currentPage}`;
        // let link = `http://localhost:4000/api/v1/61f6339a79da0e82b057b898/posts?keyword=${keyword}&page=${currentPage}`;

       
        if(category){
         
          link = `http://localhost:4000/api/v1/${currentGroup}/posts?keyword=${keyword}&page=${currentPage}&category=${category}`;
        }
        const {data}=await axios.get(link,{withCredentials: true});
        
    
        dispatch({
            type:ALL_POST_SUCCESS,
          
            payload:data,
        })
    }catch(error){
    
        dispatch({
            type:ALL_POST_FAIL,
            // payload:error,
            payload:error.response.data.message,
        });
    }

}



// Create Post
export const createPost = (groupId,postData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_POST_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };
   
    
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/${groupId}/admin/post/new`,
        postData,
        config
      );
  
      dispatch({
        type: NEW_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_POST_FAIL,
        payload: error.response.data.message,
      });
    }
  };





export const getPostDetails=(id,groupId)=>async(dispatch)=>{
    try{
    //  console.log(groupId);
        dispatch({type:POST_DETAILS_REQUEST});
              
        const {data}=await axios.get(`http://localhost:4000/api/v1/${groupId}/post/${id}`,{withCredentials: true});
        // const {data}=await axios.get(`http://localhost:4000/api/v1/61f6339a79da0e82b057b898/post/${id}`);
    
    
        dispatch({
            type:POST_DETAILS_SUCCESS,    
            payload:data.post,
        })
    }catch(error){
        dispatch({
            type:POST_DETAILS_FAIL,
            // payload:error,
            payload:error.response.data.message,
        });
    }

}



    // clearing errors
    export const clearErrors=()=>async (dispatch)=>{
        dispatch({type:CLEAR_ERRORS});
    }


    // export const getServerSideProps=async()=>{
    //     const res = await axios.get("http://localhost:4000/api/v1/61f6339a79da0e82b057b898/posts")
    //       console.log(res.data)
    //     return{
    //         props:{
    //             posts:res.data
    //         }
    //     }
    // }