import UpdatePassword from "../../components/UpdatePassword"

const update = () => {
    return (
        <div>
            <UpdatePassword/>
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
