import React from 'react'
import { ImSpinner } from "react-icons/im";


function SpinnerButton({className, title, Loading, onClick}:any) {
  return (
     <button onClick={onClick} className={className} >
        {Loading ? <ImSpinner className='animate-spin text-[22px]'/> : title }
     
     </button> 
  )
}

export default SpinnerButton
