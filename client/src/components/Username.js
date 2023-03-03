import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Add from '../assets/Add.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';
 
export default function Username() {
 
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : ''
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
    }
  })
  return (
    <div className="container mx-auto">
       
       <Toaster position='top-center' reverseOrder={false}></Toaster> 

      <div className='flex justify-center items-center h-screen'>
      <div>

      <h2 className="text-center text-3xl leading-9 
        font-extrabold text-gray-800"
      >
        Sign In to your account
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
                  <img src={Add} className={styles.profile_img} alt="Add" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn} type='submit'>Continue!</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              </div>

          </form>
          </div>
      </div>
    </div>
  )
}
