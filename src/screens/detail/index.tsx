import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams} from 'react-router-dom'
import CLoader from '../../components/CLoader'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useDispatch } from 'react-redux'
import { addtocart } from '../../store/cartSlice'

function Index(){
  const params = useParams()
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isLoading , setisLoading] = useState(false);
   const [detailview, setDetailview] = useState<any>({});

   const getDetailProduct = async()=>{
    setisLoading(true)
   const docRef = doc(db,"products", `${params.id}`);
   const docSnap = await getDoc(docRef);
     setDetailview(docSnap.data())
     setisLoading(false)
   }
   useEffect(()=>{
    getDetailProduct()
  },[])
  const {title,image,description,price,category} = detailview;
  
  return isLoading ? <CLoader/> : (
    
    <div className='max-w-[1200px] mx-auto my-10'>
       <button onClick={()=> navigate(-1)} className='bg-[#0088ff] p-2 rounded-[30px] text-white' >BACK</button>
       <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div>
                <img className='w-[400px] mx-auto' src={image} alt=""/>
            </div>
            <div>
                <h2 className='font-bold text-[18px] border-b-[2px] border-[black] dark:border-[white] pb-3'>{title}</h2>
                <p className='my-5'>{description}</p>
                <p className='text-[red] font-bold'>Category: {category}</p>
                <p className='text-[green] dark:text-[white] font-bold text-[22px]'>${price}</p>
                <button onClick={()=>dispatch(addtocart(detailview))} className='bg-[#0088ff] px-4 py-2 rounded-[30px] text-white mt-5'>Add to Cart</button>
            </div>
        </div>
  
    </div>
  )
}

export default Index