import ReactStars from "react-rating-stars-component";

function ReviewCard({review}) {

    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        // activeColor="#ffd700",
        size:25,
        // size:window.innerWidth<600?20:25,
        value:review.rating,
        isHalf:true,
    }
    return (
        <div className="bg-slate-400 m-4">
            <p>{review.name}</p>
            <ReactStars {...options}/>
            <p>{review.comment}</p>
        </div>
    )
}

export default ReviewCard
