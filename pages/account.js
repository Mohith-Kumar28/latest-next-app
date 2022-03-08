import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Profile from "../components/Profile"

const account = () => {
//    const router=useRouter()
//     const{isAuthenticated}=useSelector((state)=>state.user)
   
//     useEffect(()=>{
//         if(isAuthenticated==false){
//          router.push("/login");
   
//         }
//     },[]);
   
    return (
        
        <div>
          this is account 
         
             
             <Profile />
        
        </div>
    )
    
}

export async function getStaticProps(context) {
    return {
      props: {
        protected: true
      }
    };
  }
export default account
