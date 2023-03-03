import React, { useState } from 'react'
import Add from '../assets/Add.png';
import  { Toaster } from 'react-hot-toast';
//import { useFormik } from 'formik';
//import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
//import { updateUser } from '../helper/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css'

export default function Detail() {

  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }
  function updatee(){
    navigate('/profile')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${extend.glass}`} style={{ width: "45%", paddingTop: '2em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                {/* You can update the details. */}
            </span>
          </div>

          <form className='py-1'>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={apiData?.profile || file || Add} className={`${styles.profile_img} ${extend.profile_img}`} alt="Add" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                
                <span className='text-1xl font-bold'> Hello {apiData?.lastName} thank you for signing up with us. your status is still pending and under review </span>
                <span className='text-1xl font-bold'> Incase of any information we are going to reach you through your Number: {apiData?.mobile} or your Email {apiData?.email}</span>
                <br />
                <br />
                
                

                
                  {/* <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="text" placeholder='Mobile No.' />
                  <input {...formik.getFieldProps('email')}className={styles.textbox} type="text" placeholder='Email*' />
                

               
                  <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" placeholder='Address' /> */}
                  <button className={styles.btn} onClick={updatee}>Click here to update details</button>
               
                  
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}

