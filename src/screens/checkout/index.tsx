import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { ProductUpload } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ImCross } from "react-icons/im";
import { removeFromCart } from '../../store/cartSlice';



function Upload() {
  const cart = useSelector((state: any) => state.cart);
  const totalQty = cart.reduce((totalQty: any, item: any) => totalQty + item.quantity, 0);
  const TotalPrice = cart.reduce((total: any, item: any) => total + item.quantity * item.price, 0);
  const SaleDiscount = 10.99;
  const ShippingRate = 25;
  const Total = cart.reduce(() => TotalPrice - SaleDiscount + ShippingRate, 0);
  const dispatch = useDispatch();
  
  const navigate = useNavigate()
  const [errors, setErrors] = useState<any>({})
  const [values, setvalues] = useState<any>({
    FName: "",
    LName: "",
    sAddress: "",
    floor: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors: any = {};
    if (!values.FName.trim()) {
      validationErrors.FName = "Firstname Must Required"
    }
    if (!values.LName.trim()) {
      validationErrors.LName = "Lastname Must Required"

    }
    if (!values.sAddress.trim()) {
      validationErrors.sAddress = "Street Address Must Required"
    }
    if (!values.floor.trim()) {
      validationErrors.floor = "Please Put Something"
    }
    if (!values.city.trim()) {
      validationErrors.city = "City Must Required"
    }
    if (!values.state.trim()) {
      validationErrors.state = "State Must Required"
    }
    if (!values.zipcode) {
      validationErrors.zipcode = "Zipcode Must Required"
    }
    if (!values.phone) {
      validationErrors.phone = "Phone no Must Required"
    }

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setvalues({
        FName: "",
        LName: "",
        sAddress: "",
        floor: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
      })
    }


  }

  return (
    <>
      <div className='max-w-[1300px] mx-auto my-5'>
        <button onClick={() => navigate(-1)} className='bg-[#0088ff] p-2 rounded-[30px] text-white' >BACK</button>
      </div>
      <div className='max-w-[1300px] mx-auto my-5 grid grid-cols-[70%_Auto] gap-5'>
        <div>
          <div className='mx-auto bg-[#ededed] dark:bg-[#c9c8c8] p-10 rounded-xl'>
            <h2 className='text-[27px] font-semibold mb-2 dark:text-[black]'>Delivery Address</h2>
            <form onSubmit={handleSubmit} className='flex flex-col m-3 sm:m-0 text-[16px] dark:text-[black]' action="">
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label>First Name</label>
                  <input onChange={(e: any) => setvalues({ ...values, FName: e.target.value })} value={values.FName} id='fname' className=
                    {`${errors.FName && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
                  {errors.FName && <span className='text-[14px] text-[red]'>{errors.FName}</span>}
                </div>
                <div>
                  <label>Last Name</label>
                  <input onChange={(e: any) => setvalues({ ...values, LName: e.target.value })} value={values.LName} id='Title' className=
                    {`${errors.LName && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
                  {errors.LName && <span className='text-[14px] text-[red]'>{errors.LName}</span>}
                </div>
              </div>

              <label>Street Address</label>
              <input onChange={(e: any) => setvalues({ ...values, sAddress: e.target.value })} value={values.sAddress} id='price' className=
                {`${errors.sAddress && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="number" />
              {errors.sAddress && <span className='text-[14px] text-[red]'>{errors.sAddress}</span>}
              <label>Apt/Suite/Floor</label>
              <input onChange={(e: any) => setvalues({ ...values, floor: e.target.value })} value={values.floor} id='category' className=
                {`${errors.floor && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
              {errors.floor && <span className='text-[14px] text-[red]'>{errors.floor}</span>}
              <div className='grid grid-cols-3 gap-3'>
                <div>
                  <label>City</label>
                  <input onChange={(e: any) => setvalues({ ...values, city: e.target.value })} value={values.city} id='Title' className=
                    {`${errors.city && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
                  {errors.city && <span className='text-[14px] text-[red]'>{errors.city}</span>}
                </div>
                <div>
                  <label>State</label>
                  <input onChange={(e: any) => setvalues({ ...values, state: e.target.value })} value={values.state} id='Title' className=
                    {`${errors.state && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="text" />
                  {errors.state && <span className='text-[14px] text-[red]'>{errors.state}</span>}
                </div>
                <div>
                  <label>Zip Code</label>
                  <input onChange={(e: any) => setvalues({ ...values, zipcode: e.target.value })} value={values.zipcode} id='Title' className=
                    {`${errors.zipcode && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="number" />
                  {errors.zipcode && <span className='text-[14px] text-[red]'>{errors.zipcode}</span>}
                </div>
              </div>
              <div className='grid grid-cols-2 gap-2 items-center'>
                <div>
                  <label>Phone</label>
                  <input onChange={(e: any) => setvalues({ ...values, phone: e.target.value })} value={values.phone} id='Title' className=
                    {`${errors.phone && 'border-[1px] border-[red]'} bg-[#ffffff] p-2 rounded-md w-full`} type="number" />
                  {errors.phone && <span className='text-[14px] text-[red]'>{errors.phone}</span>}
                </div>
                {
                  cart.length == 0 ? 
                  <button className='bg-[#c2c2c2] h-[40px] text-white rounded-lg mt-8' disabled>Checkout</button>
                  :
                  <button className='bg-[#2F9EED] h-[40px] text-white rounded-lg mt-8' onClick={handleSubmit}>Checkout</button>
                }
              </div>
            </form>
          </div>


        </div>
        <div>
          <div className='flex flex-col gap-5 bg-[#ededed] dark:bg-[#c9c8c8] p-3 rounded-xl'>
            <h2 className='text-[27px] font-semibold mb-2 dark:text-[black] border-b-2 border-[gray]'>Order Summary</h2>
            <div className='grid grid-cols-2'>
              <h2 className='font-bold dark:text-[black]'>Total Items :</h2> <h2 className='dark:text-[black] font-bold'>{totalQty}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h2 className='font-bold dark:text-[black]'>Amount :</h2> <h2 className='dark:text-[black] font-bold'>{TotalPrice.toLocaleString()}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h2 className='font-bold dark:text-[black]'>Sale Discount :</h2> <h2 className='text-[red] font-bold'>- ${SaleDiscount}</h2>
            </div>
            <div className='grid grid-cols-2'>
              <h2 className='font-bold dark:text-[black]'>Shipping Detail :</h2> <h2 className='text-[green] font-bold'>+ ${ShippingRate}</h2>
            </div>
            <h2 className='text-[23px] font-semibold dark:text-[black] border-t-2 border-[gray]'>Total Amount : $ {Total.toLocaleString()}</h2>
            <div>
            </div>
          </div>
          {cart.map((item: any) => {
            return (
              <div className='flex items-center gap-5 border-[1px] border-[#bdbdbd] rounded-xl shadow-lg mt-5'>
                <img src={item.image} alt={item.title} className='w-[70px] h-[70px] rounded-[5px]' />
                <div className='flex flex-col p-2'>
                  <h3 className='text-[16px] font-bold'>{item.title}</h3>
                  <p>{item.description.slice(0, 40)}...</p>
                </div>
              </div>
            )
            console.log(item)
          })}
        </div>
      </div>
    </>
  )
}

export default Upload