import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Add from '../assets/Add.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate'
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';
//import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';
 
export default function Register() {
  const navigate = useNavigate()
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });
      registerPromise.then(function(){ navigate('/')});
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
       
       <Toaster position='top-center' reverseOrder={false}></Toaster> 

      <div className='flex justify-center items-center h-screen'>
      <div>

      <h2 className="text-center text-3xl leading-9 
        font-extrabold text-gray-800"
      >
        Fill in all your details to register
      </h2>
      <p className="text-center text-sm leading-5 
         text-gray-600"
      >
        Or
        <span className="text-black mx-2">
          Create an account
        </span>
        It's simple and easy
        <br />
      </p>
      <br />

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
              <label htmlFor="profile">
                    <img src={file || Add} className={styles.profile_img} alt="Add" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password*' />
                  <button className={styles.btn} type='submit'>Register</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login</Link></span>
              </div>

          </form>
          </div>
      </div>
    </div>
  )
}
