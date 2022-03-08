import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
const Post = ({post}) => {

    const{currentGroup}=useSelector((state)=>state.currentGroup)
    return (
        <div>
            
        {/* <Link to={"/post/asdf"}> */}
        <Link href={`/${currentGroup}/post/${post._id}`}>
            <div className="border-2 text-white m-3">
            <button className="bg-slate-400">test button</button>
                <p >name <b className="text-blue-700">{post.name}</b></p>
                <p>description {post.description}</p>
                <p>category {post.category}</p>
                <p>currentGroup : {currentGroup}</p>
            {post.images.map((img)=> <Image key={img._id} src={img.url} width={180} height={100} alt="Post Preview" /> )}


            {/* <Image  src="https://res.cloudinary.com/mohith/image/upload/v1646716558/posts/rsv5vh9r7bzvls32pjq5.jpg" width={100} height={100} alt="Post Preview" /> */}
       

            </div>
            </Link>

        </div>
      
    )
}

export default Post
