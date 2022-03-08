import { userReducer } from "../reducers/userReducer"
import Link from "next/link"
import Loader from "../components/Loader"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useRouter } from 'next/router'
import Image from 'next/image'
// import { redirect } from "next/dist/server/api-utils"

const Profile = () => {
    const router = useRouter()
   
    const{user,loading,isAuthenticated}=useSelector((state)=>state.user)
   
    // useEffect(()=>{
    //     if(isAuthenticated==false){
    //     // if(isAuthenticated===false){
    //      router.push("/login");
   
    //     }
    // },[router,isAuthenticated]);
    return (
        <div>
             {loading?(<Loader/>):(
              <div className="flex">
     
              <Link href="/me/update">
        <div className="mx-2 bg-red-500">edit profile</div>
        </Link>
             
                  name:{user?.name},,,,,
                  <img src={user?.avatar?.url} alt={user?.name} />
                  {/* <img src={user.avatar.url?user.avatar.url:"/img/Profile.png"} alt={user.name} /> */}
             
                  email:{user?.email},,,,
                  {/* joined on:{String(user.createdAt).substr(0,10)} */}
                
                 <Link href="/password/update"><div className="mx-2 bg-red-500">Change password</div></Link>
              
        </div>)}
          
        </div>
    )
}



export default Profile

