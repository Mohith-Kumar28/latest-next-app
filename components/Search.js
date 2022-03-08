import { useState } from "react"
import { useRouter } from 'next/router'

const Search = () => {
    const router=useRouter();
    const [keyword,setKeyword]=useState("");

    const searchSubmitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            router.push({pathname:'/',query:{keyword}});
            // router.push(`/${keyword}`);
        }else{
            router.push("/")
        }
    };
    return (
        <div>
            <form onSubmit={searchSubmitHandler}>
                <input type="text" placeholder="search a post" onChange={(e)=>setKeyword(e.target.value)}/>
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

export default Search
