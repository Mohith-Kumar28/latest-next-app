import {useSelector,useDispatch} from "react-redux"
import { clearErrors,createPost } from "../actions/postActions"
import {useAlert} from "react-alert"
import { NEW_POST_RESET } from "../constants/postConstants"
import { useRouter } from "next/router"
import { useState,useEffect  } from "react"
import Image from 'next/image'

const NewPost = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const router=useRouter();
  
    const { loading, error, success } = useSelector((state) => state.newPost);
  
    const [name, setName] = useState("");
  
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const[nowGroup,setNowGroup]=useState("61f6339a79da0e82b057b898");
  

    const categories=[
        "movie",
        "podcast",
        "doubt",
        "dontknow"
    ]

    const{currentGroup}=useSelector((state)=>state.currentGroup)


    useEffect(()=>{
      setNowGroup(currentGroup);
  },[currentGroup])



    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Post Created Successfully");
          router.push("/");
          dispatch({ type: NEW_POST_RESET });
        }
      }, [dispatch, alert, error, router, success]);


      const createPostSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
      
        myForm.set("description", description);
        myForm.set("category", category);

        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createPost(nowGroup,myForm));
        // router.push("/")
        setName("");
        setCategory("");
        setDescription("");
        setImages([]);
        setImagesPreview([]);
      };



      const createPostImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };



    return (
        <div>
            <form
           
            encType="multipart/form-data"
            onSubmit={createPostSubmitHandler}
          >
            <h1>Create Post</h1>

            <div>
          
              <input
                type="text"
                placeholder="Post Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          

            <div>
     
              <textarea
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
       
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>


            <div >
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createPostImagesChange}
                multiple
              />
            </div>

            <div >
              {imagesPreview.map((image, index) => (
                <Image key={index} src={image}     width={100}
                height={100} alt="Post Preview" />
                // <img key={index} src={image}  alt="Post Preview" />
              ))}
            </div>

            <input
              type="submit"
              disabled={loading ? true : false}
           />
            
          </form>
        </div>
    )
}

export default NewPost
