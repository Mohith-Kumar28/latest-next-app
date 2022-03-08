import Loader from "./Loader"
import { useRouter } from 'next/router'
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors,loadUser,updateProfile } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";



const UpdateProfile = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const router=useRouter();

    const {user}=useSelector(state=>state.user)
    const {error,isUpdated,loading}=useSelector((state)=>state.profile)

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState("/img/Profile.png");


    const updateProfileSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();

        // myForm.set("name","asdfffff");
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
      
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChange=(e)=>{
      
            const reader = new FileReader();

            reader.onload=()=>{
                if(reader.readyState===2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);

        }
    
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            //Preview issue will resolve later
            setAvatarPreview(user?.avatar?.url)
            // setAvatar(user?.avatar?.url)
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());

           router.push("/account");

           dispatch({
               type:UPDATE_PROFILE_RESET
           })
     
        }
    },[dispatch,error,alert,router,user,isUpdated]);


    return (
        <div>

            {loading?<Loader/>:
         (
            
          <form  encType="multipart/form-data" onSubmit={updateProfileSubmit}>
            {/* {user.name} */}
           <input type="text" placeholder="Name" required name="name" value={name} onChange={(e)=>setName(e.target.value)} />
           <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
     
           <img className="w-10" src={avatarPreview} alt="Avatar preview" />

           <input type="file" name="avatar" accept="image/" onChange={updateProfileDataChange} />

           <input className="bg-green-600 cursor-pointer" type="submit" value="updateProfile" />
           </form>
         )
            }
           
        </div>
    )
}


export default UpdateProfile



