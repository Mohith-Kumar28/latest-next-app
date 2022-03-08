import Layout from '../components/layout'
import '../styles/globals.css'
// import { Provider } from 'react-redux';
import {wrapper} from '../store'
import {positions,transitions,Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic"

import React from 'react';
import { useEffect } from 'react'
import { loadUser } from '../actions/userAction'
import { useDispatch,useSelector } from 'react-redux'
import { useRouter } from 'next/router';

const options={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
};

function MyApp({ Component, pageProps }) {
  const router=useRouter();
  const {user,loading}=useSelector(state=>state.user)

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(loadUser())
  },[])

 
    if (pageProps.protected && !loading && !user) {
  
    // return (
    //   <Layout>Loading...</Layout>
    // )
    router.push("/login")
  }
  

  


  return (
   
    <AlertProvider template={AlertTemplate} {...options}>
  <Layout>
  
 
  <Component {...pageProps} />
  </Layout>
  
  </AlertProvider>
  )
}

export default wrapper.withRedux(MyApp)
