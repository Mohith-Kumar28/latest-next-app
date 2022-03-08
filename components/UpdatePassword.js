import Loader from "./Loader"
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,loadUser,updatePassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";


const UpdatePassword = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const router=useRouter();

    const {error,isUpdated,loading}=useSelector((state)=>state.profile)

    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const updatePasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword",newPassword);
        myForm.set("confirmPassword",confirmPassword);
    
        dispatch(updatePassword(myForm))
    }

   
    
    useEffect(()=>{
     

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");
   
           router.push("/account");

           dispatch({
               type:UPDATE_PASSWORD_RESET
           })
     
        }
    },[dispatch,error,alert,router,isUpdated]);

    return (
        <div>
              {loading?<Loader/>:
         
         <form onSubmit={updatePasswordSubmit}>
          
          <input type="password" placeholder="Old Password" required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />

          <input type="password" placeholder="New Password" required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />

          <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

          <input className="bg-green-600 cursor-pointer" type="submit" value="Change" />
          </form>
           }
        </div>
    )
}

export default UpdatePassword
