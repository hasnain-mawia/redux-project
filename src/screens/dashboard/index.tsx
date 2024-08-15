import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom';
import CLoader from '../../components/CLoader';
import { Getdata} from '../../config/firebase';

function Index() {
  const [products, setProducts] = useState<any>([]);

  const getfirebasedata = async() =>{
   const product = await Getdata()
    setProducts(product)
  }
  useEffect(() => {
    getfirebasedata()
  },[])
  // const filterData = products.filter((product:any) => {
  //   product.title.toLowerCase().includes(searchItem)
  // })
 return (
    <div>
    <div className='max-w-[1400px] mx-auto my-6 px-4'>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
        {products.length === null ? `${<h2>Products Not found</h2>}` : products.length === 0 ? <CLoader /> : 
          products.map((product:any, i:number) => {
          return(
            <Link key={i} to={`/detail/${product.id}`} state={product}>
            <div className='shadow-2xl rounded-[10px] border-2 border-[#c9c9c9] flex flex-col items-center justify-center text-center'> 
          <div className='flex justify-center card-hover'>
          <img src={product.image} alt={product.title} className='overflow-hidden rounded-[10px]'/>
          </div>
          <div className='py-3 px-2 w-full'>
            <h2 className='font-bold my-1'>{product.title.slice(0,25)}</h2>
            <p className='text-[green] dark:bg-[white] w-full rounded-[30px] text-[20px] font-semibold'>${product.price}</p>
            </div>
          </div>
          </Link>
          )
        }
      )}  
      </div>
    </div>
      </div>
  )
}

export default Index