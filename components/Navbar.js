import { useSelector } from "react-redux"
import UserOptions from "./UserOptions"
import Link from "next/link"


const Navbar = () => {
   
    const {isAuthenticated,user}=useSelector((state)=>state.user)
   

    return (
        <div className="py-3 flex  bg-blue-500">
            <Link href="/">
        <div className="mx-2">home</div>
        </Link>
            <Link href="/account">
        <div className="mx-2">account</div>
        </Link>
            <Link href="/me/update">
        <div className="mx-2">update profile</div>
        </Link>
            <Link href="/password/update">
        <div className="mx-2">update password</div>
        </Link>
            <Link href="/password/forgot">
        <div className="mx-2">forgot password</div>
        </Link>
    
   
       
        {isAuthenticated&&<UserOptions user={user}/>}
        </div>
    )
}

export default Navbar
