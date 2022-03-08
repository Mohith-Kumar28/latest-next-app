import {useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";

import { useAlert } from "react-alert";

import { getAllUsers, clearErrors, deleteUser, updateUser } from "../actions/userAction";
import { DELETE_USER_RESET, UPDATE_USER_RESET } from "../constants/userConstants";

const UsersList = () => {
  const router = useRouter()

  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const groupId=router.query.groupId
  // const groupId="61f6339a79da0e82b057b898"

  const {

    loading: updateLoading,
    error: updateError,
    isUpdated,

    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(groupId,id));
  };

  const updateSubmitHandler=(id,therole)=>{
    const userRole={role:therole}
    dispatch(updateUser(groupId,id,userRole))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      router.push("/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }
    
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      router.push("/dashboard");
      dispatch({ type: UPDATE_USER_RESET });
    }


    // console.log(router.query.groupId)
    dispatch(getAllUsers(router.query.groupId));
  }, [dispatch, alert,router, error, deleteError, isDeleted, message, isUpdated, updateError]);


  const rows = [];

  users &&
    users.forEach((item) => {
        let userRole="user";
        if(item.role.admin.includes(groupId)){
           userRole="admin"
        }
      rows.push({
        id: item._id,
        role: userRole,
        // role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
   <div>
    
  
       
       
          <h1 id="productListHeading">ALL USERS</h1>

          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> */}
         
        {rows.map(row => <div key={row.id}>{row.name},,,,{row.email},,,{row.role},,,<button className="bg-red-400" onClick={()=>deleteUserHandler(row.id)}>remove</button>

        <button className="bg-blue-500" onClick={()=>updateSubmitHandler(row.id,"admin")}>make Admin</button>
        <button className="bg-green-500" onClick={()=>updateSubmitHandler(row.id,"user")}>make User</button>

        {/* <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button> */}
        </div>)}
      </div>
  );
};

export default UsersList;