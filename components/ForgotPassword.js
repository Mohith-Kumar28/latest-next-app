import Loader from "./Loader"
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,forgotPassword} from "../actions/userAction";
import { useAlert } from "react-alert";


const ForgotPassword = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const router=useRouter();

    const {error,message,loading}=useSelector((state)=>state.forgotPassword)

    const [email,setEmail]=useState("");

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("email",email);
        dispatch(forgotPassword(myForm))
    }

    useEffect(()=>{
   

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
     
        }
    },[dispatch,error,alert,message]);
    return (
        <div>
               {loading?<Loader/>:
         
         <form onSubmit={forgotPasswordSubmit}>
     
          <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    

          <input className="bg-green-600 cursor-pointer" type="submit" value="send" />
          </form>
           }
          
        </div>
    )
}

export default ForgotPassword
