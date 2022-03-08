import ResetPassword from "../../../components/ResetPassword"
import { useRouter } from "next/router"
const token = () => {
    const router=useRouter();
   const token=router.query.token;
    return (
        <div>
            <ResetPassword token={token}/>
        </div>
    )
}

export default token
