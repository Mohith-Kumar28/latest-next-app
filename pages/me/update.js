import UpdateProfile  from "../../components/UpdateProfile"

const update = () => {
    return (
        <div>
            hi this is update
            <UpdateProfile/>
        </div>
    )
}

export async function getStaticProps(context) {
    return {
      props: {
        protected: true
      }
    };
  }


export default update
