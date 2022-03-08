import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { currentGroup } from "../actions/postActions";


const Sidebar = () => {
    const dispatch=useDispatch();
    // const currentGroupID="mohithGr"
 


    const [groups,setGroups]=useState();
    // const [groups,setGroups]=useState(["hoo","asdf"]);
//     const getGroups = async() => {
//    try{
//         const groupList =await axios.get('http://localhost:4000/api/v1/get/groupList',{withCredentials: true});
//     //  const finalGroup=groupList.data
//          return groupList.data;
//    }catch(err){
//        console.log(err);
//    }        
// };

useEffect(()=>{
 groupAsync()
    // console.log(allgroups);
//   dispatch(currentGroup("currentGroupID"))
  
},[])
const groupAsync=async()=>{
    const groupList=await axios.get('http://localhost:4000/api/v1/get/groupList',{withCredentials: true});
    const finalgroup= groupList.data;
  setGroups(finalgroup);

    // return finalgroup;
}

// i am here

 


  
    return (
        <div>
                 <div className="bg-red-500 space-y-4 overflow-y-scroll scrollbar-hide h-screen">

                <button className="flex items-center"> <p>groupname</p></button>

               
               {groups && groups.map((group)=>{
        //  <GroupElement key={group.id} group={group} />
               return  <div key={group.id}><button onClick={()=> dispatch(currentGroup(group.id))} className="flex items-center bg-slate-400"> <p >{group.name}</p></button></div>
            
            })}
           
              
      
           </div>
        </div>
    )
}



export default Sidebar

