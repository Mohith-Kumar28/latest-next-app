
import {useRouter} from "next/router";
import { useSelector,useDispatch } from "react-redux";
import {clearErrors, getPostDetails} from "../../../actions/postActions"
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "../../../components/ReviewCard.js"
import Loader from "../../../components/Loader";
import {useAlert} from "react-alert"
// import Image from "next/image";

const Post = () => {
    const router=useRouter();
    const dispatch=useDispatch();
    const alert = useAlert();
    // const postId=router.params;
    const postId=router.query.postId;
    const groupId=router.query.groupId;
    // console.log(groupId);
    const {post,loading,error}=useSelector((state)=>state.postDetails);

    
    
    useEffect(() => {

      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
        // const fetchData = async () => {
      if(router.query.postId,router.query.groupId){
      dispatch(getPostDetails(router.query.postId,router.query.groupId))
        }
    // }
    // fetchData()
    }, [dispatch,router.query.postId,router.query.groupId,error,alert]) ;

    
    
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        // activeColor="#ffd700",
        size:25,
        // size:window.innerWidth<600?20:25,
        value:4,
        // value:post.reviews,
        isHalf:true,
    }
    return (
      <div>
          {loading? <Loader/>:(
          
          <div className="flex-col">
     <b><p>this is post details : {postId}</p></b>   
                 <ReactStars {...options}/>
                 <p>name of ppost <b>{post.name}</b> </p>
                <p>description {post.description}</p>
                <p>{post.ratings}Rating({post.numberOfReviews})</p>
                <p>category  {post.category}</p>
        {post.reviews && post.reviews[0] ? (
            <div >
              {post.reviews &&
                post.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                    ))}
            </div>
          ) : (
              <p >No Reviews Yet</p>
              )}
          
        </div>
          
          )}
       
      </div>
        
    )
}

export async function getServerSideProps(context) {
  return {
    props: {
      protected: true
    }
  };
}

export default Post