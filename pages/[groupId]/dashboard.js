import Dashboard from "../../components/Dashboard"

const dashboard = () => {
    return (
        <div>
            <Dashboard/>
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
// export async function getStaticProps(context) {
//     return {
//       props: {
//         protected: true
//       }
//     };
//   }

export default dashboard 
