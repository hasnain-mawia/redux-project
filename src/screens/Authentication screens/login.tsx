import React, { useState } from 'react'
import { LoginSetup} from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate()
    const [errors , setErrors] = useState<any>({});
    const [showpassword, setshowpassword] = useState(false);
    const [values, setvalues] = useState<any>({
       email:"", 
       password:"", 
       cpassword:"", 
    })
    const submitdata = async(e:any) =>{
        e.preventDefault()
        const validationErrors:any = {};
         if(!values.email.trim()){
        validationErrors.email = "Email Must Required"
        }else if(!values.email.match(/^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/)){
        validationErrors.email = "Email Is Not Valid"
        }
        if(!values.password.trim()){
        validationErrors.password = "Password Must Required"
        }else if(values.password.length < 8){
        validationErrors.password = "Password must be atleast 8 Characters"   
        }
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
        await LoginSetup(values.email, values.password).then(()=>{

          toast.success(`Login Successfully`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
          localStorage.setItem('isLogin', "true"); 
          navigate('/dashboard')
        }).catch((error)=>{
          toast.error(`Please Enter valid Crediantials`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            });
        })
       
        setvalues({
            email:"",
            password:"",
        })
    }
    }
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
        <div className='flex justify-center items-center h-screen'>
      <div className='w-[400px] bg-white shadow-2xl rounded-2xl px-3 py-10'>
           <h2 className='text-[30px] font-semibold text-center dark:text-[black]'>Login</h2> 
           <form onSubmit={submitdata} className='flex flex-col gap-5 dark:text-[black]' action="">
            <div>
            <label htmlFor="">Email</label>
            <input onChange={(e:any)=> setvalues({...values,email:e.target.value})} value={values.email} type="text" name='email' placeholder='Enter your Email' className={`border-[1px] border-[#3786F4] focus:outline-none ${errors.email && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}/>
            {errors.email && <span className='text-[14px] text-[red]'>{errors.email}</span>}
            </div>
            <div>
            <label htmlFor="">Password</label>
            <input onChange={(e:any)=> setvalues({...values,password:e.target.value})} value={values.password} type={`${!showpassword ? 'password': 'text'}`} name='password' placeholder='•••••••••••••••' className={`${errors.password && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.password && <span className='text-[14px] text-[red]'>{errors.password}</span>}
            </div>
            <div className='flex items-center w-full gap-2 text-[16px]'>
            <input defaultChecked={showpassword} onChange={()=> {setshowpassword((prev)=> !prev)}} type="checkbox" id="number" name="number" value="number"/>
             <label htmlFor="number">Show Password</label>
        </div> 
            <p className='flex justify-center gap-2'>Create an Account<Link to={'/register'} className='text-[#3588F2]'>Register</Link></p>
            <button className='bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-2 rounded-xl text-[18px]'>Login</button>
           </form>
      </div>
        </div>
    </div>
  )
}

export default Login
