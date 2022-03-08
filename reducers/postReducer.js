import { ALL_POST_FAIL,ALL_POST_REQUEST,ALL_POST_SUCCESS, CLEAR_ERRORS,POST_DETAILS_FAIL,POST_DETAILS_SUCCESS,POST_DETAILS_REQUEST,CURRENT_GROUP_ID,NEW_POST_FAIL,NEW_POST_REQUEST,NEW_POST_SUCCESS,NEW_POST_RESET } from "../constants/postConstants";

export const currentGroupReducer=(state={currentGroup:"61f6339a79da0e82b057b898"},action)=>{
    switch(action.type){
        case CURRENT_GROUP_ID:
            state.currentGroup=action.payload
            return{
                ...state
            }
        default:
            return state;
    }
}


export const postReducer=(state={posts:[]},action)=>{
    switch(action.type){
        case ALL_POST_REQUEST:
            return{
                loading:true,
                post:[],
            };
        case ALL_POST_SUCCESS:  
            return{
                loading:false,
                // post:action.payload,
                posts:action.payload.posts,
                postsCount:action.payload.postCount,
                resultPerPage:action.payload.resultPerPage,
                filteredPostsCount:action.payload.filteredPostsCount,
            };
        case ALL_POST_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};





export const newPostReducer = (state = { post: {} }, action) => {
    switch (action.type) {
      case NEW_POST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_POST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          post: action.payload.post,
        };
      case NEW_POST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_POST_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


export const postDetailsReducer=(state={post:{}},action)=>{
    switch(action.type){
        case POST_DETAILS_REQUEST:
            return{
                loading:true,
                ...state,
            };
        case POST_DETAILS_SUCCESS:  
            return{
                loading:false,
                post:action.payload,
             
            };
        case POST_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};