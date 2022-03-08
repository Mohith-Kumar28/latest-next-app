import { combineReducers, applyMiddleware, createStore} from "redux";

import {HYDRATE,createWrapper} from "next-redux-wrapper"

import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { postReducer,postDetailsReducer, currentGroupReducer, newPostReducer } from "./reducers/postReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";

const reducer=combineReducers({
    postDetails:postDetailsReducer,
    user:userReducer,
    posts:postReducer,
    currentGroup:currentGroupReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    newPost:newPostReducer
});

let initialState={};
const middleware=[thunk];
const finalreducer=(state,action)=>{
    if(action.type==HYDRATE){
        const nextState={
            ...state,
            ...action.payload
        }
        return nextState
    }else{
        return reducer(state,action)
    }
}

const store=()=>{return createStore(
//    reducer,
    finalreducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
}
export default store;
 export const wrapper=createWrapper(store)