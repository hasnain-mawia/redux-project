import React, { useEffect, useState } from 'react'
import { Logout } from '../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import {auth, onAuthStateChanged } from "../config/firebase";
import { LuLogOut } from 'react-icons/lu';
import { FaMoon, FaSun } from "react-icons/fa6";


function Header() {
  const storageKey:any = localStorage.getItem('DarkMode')
  const  [isBrigth, setIsBrigth] = useState<any>(JSON.parse(storageKey));
  {isBrigth ? document.body.classList.add('dark') : document.body.classList.remove('dark')}
  const darkMode = () =>{
    setIsBrigth(!isBrigth)
    localStorage.setItem('DarkMode',`${!isBrigth}`);
  }
    const navigate = useNavigate()
    const [user, setUser] = useState<any>();
    const logoutUser = () =>{
    Logout(navigate)
  }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        setUser(user);
          });
     }) 

     useEffect(()=>{
      const {pathname} = window.location;
      if (user) {
        if(pathname === '/'){
          navigate('/dashboard')
        }
      }else{
        if(pathname === '/upload'){
          navigate('/')
        }
      }

     },[window.location, user])

      return user ? (
    <div className='bg-[#2F9EED] p-2 dark:bg-[gray]'>
        <div className='flex items-center justify-between max-w-[1300px] mx-auto'>
        <div>
        <button onClick={()=> navigate('/upload')} title='upload product' className='bg-[white] dark:bg-[#2F9EED] rounded-[30px] dark:text-[white] px-3 py-2'>Upload Product</button>
        </div>
        {/* <input type="text" className='p-3 bg-slate-400' onChange={(e)=>setSearchItem(e.target.value)} /> */}
        <div className="flex items-center gap-2">
        <Link className='text-white font-medium' to={'/dashboard'}>All Products</Link>
        <div className='flex justify-end items-center gap-2 bg-[#ffffff] dark:bg-[#2F9EED] pl-4 rounded-[30px]'>
        <p className='font-semibold'>{user?.email}</p>
        <button onClick={logoutUser} title='Logout' className='bg-[red] text-white rounded-[30px] p-3'><LuLogOut className='text-[22px]' /></button>
        </div>
        <button onClick={darkMode} className='text-[23px] bg-white text-black w-[40px] h-[40px] rounded-[300px] flex items-center justify-center'>{isBrigth ? <FaSun /> :<FaMoon />} </button>
        </div>
        </div>
    </div>
  ): null
}

export default Header