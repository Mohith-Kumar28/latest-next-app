import {useAlert} from "react-alert"
import { logout } from "../actions/userAction"
import { useDispatch } from "react-redux";

const UserOptions = ({user}) => {
    const alert=useAlert();
    const dispatch=useDispatch();
    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully")
    }
    return (
        <div>
            <img className="w-9" src={user.avatar.url?user.avatar.url:"/img/Profile.png"} alt="Profile" />

            <button className="bg-purple-600" onClick={logoutUser}>logout</button>
        </div>
    ) 
}    

export default UserOptions
