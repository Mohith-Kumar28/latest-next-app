import Loader from "./Loader"
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,resetPassword } from "../actions/userAction";
import { useAlert } from "react-alert";


const ResetPassword = ({token}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const router=useRouter();

    const {error,success,loading}=useSelector((state)=>state.forgotPassword)

    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")

    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
    
        dispatch(resetPassword(token,myForm))
    }

   
    
    useEffect(()=>{
     

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Password Updated Successfully");
   
           router.push("/login");

       
     
        }
    },[dispatch,error,alert,router,success]);

    return (
        <div>
              {loading?<Loader/>:
         
         <form onSubmit={resetPasswordSubmit}>
          
   
          <input type="password" placeholder="New Password" required value={password} onChange={(e)=>setPassword(e.target.value)} />

          <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

          <input className="bg-green-600 cursor-pointer" type="submit" value="Update" />
          </form>
           }
        </div>
    )
}

export default ResetPassword
