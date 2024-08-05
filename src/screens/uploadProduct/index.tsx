import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { ProductUpload } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';


function Upload() {
    const navigate = useNavigate()
    const [errors , setErrors] = useState<any>({})
    const [values, setvalues] = useState<any>({
        title:"",
        price:"",
        category:"",
        description:"",
        image:"",
        quantity:1,
    })

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const validationErrors:any = {};
        if(!values.title.trim()){
            validationErrors.title = "Title Must Required"
        }
        if(!values.price.trim()){
            validationErrors.price = "Price Must Required"
  
        }
        if(!values.category.trim()){
            validationErrors.category = "Category Must Required"
        }    
        if(!values.description.trim()){
        validationErrors.description = "Description Must Required"
        }
        if(!values.image){
        validationErrors.image = "Please Upload product image"
        }
       
         setErrors(validationErrors)
        if(Object.keys(validationErrors).length === 0){
            ProductUpload(values)
            try{
                toast.success(`${values.title} Uploaded Successfully`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                        });
                        navigate('/dashboard')
                    }
                catch(err){
                    console.log(err)
                    toast.error(`${values.title} err`, {
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
                title:"",
                price:"",
                category:"",
                description:"",
                image:"",
            })
        }

      
    }

  return (
    <>
    <div className='max-w-[1300px] mx-auto my-5'> 
        <button onClick={()=> navigate(-1)} className='bg-[#0088ff] p-2 rounded-[30px] text-white' >BACK</button>
    </div>
    <div className='max-w-[1300px] mx-auto my-5 bg-[#ededed] dark:bg-[#c9c8c8] p-10 rounded-xl'>
      <h2 className='text-[27px] font-semibold mb-2 dark:text-[black]'>Add Product</h2>
            <div className='mt-2 max-w-[1200px] mx-auto'>
            <form onSubmit={handleSubmit} className='flex flex-col m-3 sm:m-0 text-[16px] dark:text-[black]' action="">
            <label>Title</label>
            <input onChange={(e:any)=> setvalues({...values,title:e.target.value})} value={values.title} id='Title' className=
            {`${errors.title && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
            {errors.title && <span className='text-[14px] text-[red]'>{errors.title}</span>}
            <label>Price</label>
            <input onChange={(e:any)=> setvalues({...values,price:e.target.value})} value={values.price} id='price' className=
            {`${errors.price && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}  type="number"/>
            {errors.price && <span className='text-[14px] text-[red]'>{errors.price}</span>}
            <label>Category</label>
            <input onChange={(e:any)=> setvalues({...values,category:e.target.value})} value={values.category} id='category' className=
            {`${errors.category && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`} type="text"/>
            {errors.category && <span className='text-[14px] text-[red]'>{errors.category}</span>}
            <label>Description</label>
            <textarea onChange={(e:any)=> setvalues({...values,description:e.target.value})} value={values.description} id='description' className=
            {`${errors.description && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}></textarea>
            {errors.description && <span className='text-[14px] text-[red]'>{errors.description}</span>}
            <div className='grid grid-cols-2 gap-2 items-center'>
              <div className='w-full flex flex-col'>
              <label>Upload Image</label>
              <input type="file" onChange={(e:any)=> setvalues({...values,image:e.target.files[0]})} className=
                {`${errors.image && 'border-[1px] border-[red]' } bg-[#ffffff] p-2 rounded-md w-full`}/>
                {errors.image && <span className='text-[14px] text-[red]'>{errors.image}</span>}
              </div>
                <button className='bg-[#2F9EED] h-[40px] text-white rounded-lg mt-8' onClick={handleSubmit}>Upload</button>
            </div>
        </form>
      </div>
         
            
        </div>
        </>
  )
}

export default Upload