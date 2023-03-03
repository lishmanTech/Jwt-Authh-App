import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store'
import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'

export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      
    });
    
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div>

        <h2 className="text-center text-3xl leading-9 
        font-extrabold text-gray-800"
      >
        Enter OTP to recover Email
      </h2>
      <p className="text-center text-sm leading-5 
         text-gray-600"
      >
        Or
        <span className="text-black mx-2">
          Recover your Email
        </span>
        Check email for OTP
        <br />
      </p>

          <form className='pt-20' onSubmit={onSubmit}>

              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                  </div>

                  <button className={styles.btn} type='submit'>Recover</button>
              </div>
          </form>

          <div className="text-center py-4">
            <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500'>Resend</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}
