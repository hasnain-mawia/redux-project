
import React, { useState } from 'react'
import { RegisterSetup} from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate()
    const [errors , setErrors] = useState<any>({});
    const [showpassword, setshowpassword] = useState(false);
    const [values, setvalues] = useState<any>({
       fullname:"", 
       email:"", 
       password:"", 
       cpassword:"", 
    })
    const submitdata = async(e:any) =>{
        e.preventDefault()
        const validationErrors:any = {};
         if(!values.fullname.trim()){
            validationErrors.fullname = "fullname Must Required"}
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
        if(!values.cpassword.trim()){
        validationErrors.cpassword = "Confirm Password Must Required"
        }
        else if(values.cpassword !== values.password){
            validationErrors.cpassword = "Password Not Match"
        }
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
        await RegisterSetup(values.email, values.password, values.fullname)
        try{
            toast.success(`Account Created succesfully`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            navigate('/')
          }catch(err){
            toast.error(`${err}`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              });
          }  
        setvalues({
            email:"",
            password:"",
            cpassword:"",
        })
    }
    }
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 h-screen'>
        <div className='flex justify-center items-center h-screen'>
      <div className='w-[400px] bg-white shadow-2xl rounded-2xl px-3 py-10'>
           <h2 className='text-[30px] font-semibold text-center dark:text-[black]'>Register</h2> 
           <form onSubmit={submitdata} className='flex flex-col gap-2 dark:text-[black]' action="">
            <div>
            <label htmlFor="">Fullname</label>
            <input onChange={(e:any)=> setvalues({...values,fullname:e.target.value})} value={values.fullname} type="text" name='email' placeholder='Enter your Email' className={`${errors.fullname && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.fullname && <span className='text-[14px] text-[red]'>{errors.fullname}</span>}
            </div>
            <div>
            <label htmlFor="">Email</label>
            <input onChange={(e:any)=> setvalues({...values,email:e.target.value})} value={values.email} type="text" name='email' placeholder='Enter your Email' className={`${errors.email && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.email && <span className='text-[14px] text-[red]'>{errors.email}</span>}
            </div>
            <div>
            <label htmlFor="">Password</label>
            <input onChange={(e:any)=> setvalues({...values,password:e.target.value})} value={values.password} type={`${!showpassword ? 'password': 'text'}`} name='password' placeholder='•••••••••••••••' className={`${errors.password && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.password && <span className='text-[14px] text-[red]'>{errors.password}</span>}
            </div>
            <div>
            <label htmlFor="">Confirm Password</label>
            <input onChange={(e:any)=> setvalues({...values,cpassword:e.target.value})} value={values.cpassword} type={`${!showpassword ? 'password': 'text'}`} name='cpassword' placeholder='•••••••••••••••' className={`${errors.cpassword && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full border-[1px] border-[#3786F4]`}/>
            {errors.cpassword && <span className='text-[14px] text-[red]'>{errors.cpassword}</span>}
            </div>
            <div className='flex items-center w-full gap-2 text-[16px]'>
            <input defaultChecked={showpassword} onChange={()=> {setshowpassword((prev)=> !prev)}} type="checkbox" id="number" name="number" value="number"/>
             <label htmlFor="number">Show Password</label>
             </div>
            <p className='flex justify-center gap-2'>Already Have an account<Link to={'/'} className='text-[#3588F2]'>Sign in</Link></p>
            <button className='bg-gradient-to-l from-cyan-500 to-blue-500 text-white p-2 rounded-xl text-[18px]'>Register</button>
           </form>
      </div>
        </div>
    </div>
  )
}

export default Register
