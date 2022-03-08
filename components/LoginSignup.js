import Loader from "./Loader"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef,useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,login,register } from "../actions/userAction";
import { useAlert } from "react-alert";


const LoginSignup = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const router=useRouter();

    const {error,loading,isAuthenticated}=useSelector(state=>state.user)

    const loginTab=useRef(null);
    const registerTab=useRef(null);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });

    const {name,email,password}=user;

    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/img/Profile.png");


    const loginSubmit=(e)=>{
        e.preventDefault(); 
        dispatch(login(loginEmail,loginPassword))
    };
    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("avatar",avatar);
        dispatch(register(myForm))
    }

    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        }else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
           router.push("/account");
        // console.log("push to account")
        }
    },[dispatch,error,alert,isAuthenticated]);


    return (
        <div>
           {loading?<Loader/>:
            <div className="bg-slate-400">
            <form ref={loginTab} onSubmit={loginSubmit} className=" ">
            
                <input type="email" placeholder="Email" required
                value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                <input type="password" placeholder="Password" required
                value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
                <Link href="/password/forgot">
          <a>Forget password</a>
             </Link>
                <input type="submit" value="Login" className="bg-red-600 cursor-pointer" />
              
            </form>

            <form ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
               <input type="text" placeholder="Name" required name="name" value={name} onChange={registerDataChange} />
               <input type="email" placeholder="Email" required name="email" value={email} onChange={registerDataChange} />
               <input type="password" placeholder="Password" required name="password" value={password} onChange={registerDataChange} />
               <img className="w-10" src={avatarPreview} alt="Avatar preview" />
               <input type="file" name="avatar" accept="image/" onChange={registerDataChange} />
               <input className="bg-green-600 cursor-pointer" type="submit" value="Register" />
               </form>
               </div>
               }
        </div>
    )
}

export default LoginSignup
