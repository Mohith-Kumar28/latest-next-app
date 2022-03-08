import Link from "next/link"
import {Doughnut,Line} from "react-chartjs-2";
import UsersList from "./UsersList";

const Dashboard = () => {

    // const lineState={
    //     labels:["Initial Amount","Amount earned"],
    //     datasets:[
    //         {
    //             label:"TOTAL AMOUNT",
    //             backgroundColor:["rgb(197,72,49)"],
    //             hoverBackgrountColor:["rgb(197,72,49)"],
    //             data:[0,4000]
    //         }
    //     ]
    // }

    return (
        <div>
            this is dashboard
            <Link href="admin/posts">
        <div className="mx-2">posts</div>
        </Link>
            <Link href="admin/users">
        <div className="mx-2">users</div>
        </Link>


         <UsersList/>
          

          {/* <Line data={lineState}/> */}
        </div>
    )
}

export default Dashboard
