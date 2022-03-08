// import {clearErrors,  getPost} from "../actions/postActions";
import {clearErrors, getPost} from "../actions/postActions";
import {useSelector,useDispatch} from "react-redux"
import {useEffect,useState} from "react"
import axios from "axios";
import Post from "./Post";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import Search from "./Search";
import Pagination from "react-js-pagination"
import Link from "next/link";

import {useRouter} from "next/router";
import NewPost from "./NewPost";

const categories=[
    "movie",
    "podcast",
    "doubt",
    "dontknow"
]

const Center=()=> {
// function Center() {
    const router=useRouter();
   const alert=useAlert();

   const[currentPage,setCurrentPage]=useState(1);
   const[category,setCategory]=useState("");
   const[nowGroup,setNowGroup]=useState("61f6339a79da0e82b057b898");

    const dispatch=useDispatch();
    const{loading,error,posts,postsCount,filteredPostsCount,resultPerPage}=useSelector((state)=>state.posts)

    const{currentGroup}=useSelector((state)=>state.currentGroup)
  
    const keyword=  router.query.keyword;
    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    };

    useEffect(()=>{
        setNowGroup(currentGroup);
        setCategory("");
        router.push({pathname:'/'})
        // console.log("new group"+currentGroup)
    },[currentGroup])

    // const currentGroupID="testGrouppppppp"
    useEffect(() => {
        if(error){
        alert.error(error)
        dispatch(clearErrors())
        }
      
        // dispatch(currentGroup(currentGroupID)) 

        dispatch(getPost(keyword,nowGroup,currentPage,category)) 
    }, [dispatch,error,keyword,nowGroup,currentPage,category])
    
    let count=filteredPostsCount;

    // const testHandler=async()=>{
        // console.log("button pres");
        // const {data}=await axios.get("http://localhost:4000/api/v1/61f6339a79da0e82b057b898/posts")
        // console.log(data);
    // }
    return (
            <div>
    {loading?(<Loader/>) :(<div className="flex-grow overflow-y-scroll p-3 h-screen">
           <Search/>
            <NewPost/>
          

       <button className="bg-yellow-300">  <Link href={`/${nowGroup}/dashboard`}>
        <div className="mx-2">dashboard</div>
        </Link></button>
           <ul>{ categories.map(category=>(
              <li className="cursor-pointer"
                  key={category}
                //   onClick={()=> router.push({pathname:'/',query:{category}})}
                  onClick={()=>setCategory(category)}
                  >
                      {category}
              </li>
          ))}</ul>
  

    {posts && posts.map(post=>(
                <Post post={post} key={post._id}/>
           ))}

      
            
        {resultPerPage<count && (
            
            <div>   
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={postsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
            </div>
        )}

            </div>)}
        </div>
    )
}

export default Center
