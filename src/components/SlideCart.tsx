import { useEffect, useState} from 'react';
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { FaPlusCircle, FaMinusCircle} from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { DecrementQty, IncrementQty, removeFromCart } from '../store/cartSlice';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function SlideCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state:any) => state.cart); 
  const [showCart, setShowCart] = useState(false);
  const totalQty = cart.reduce((totalQty:any, item:any)=>totalQty + item.quantity,0);
  const TotalPrice = cart.reduce((total:any, item:any)=>total + item.quantity*item.price,0);
  const toggleCart = () => {
    setShowCart(!showCart)}
  const removeCart = (item:any) =>{
    dispatch(removeFromCart(item))
     toast.error(`${item.title} removed`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
  }
  useEffect(()=>{
    const menu = document.querySelector('#menuref')
    document.addEventListener('mousedown',(e:any)=>{
        if(!menu?.contains(e.target)){
        setShowCart(false)}
    })
  },[])

  const isAuth = localStorage.getItem('isLogin'); 
  return isAuth ? (
    <>
    { showCart ? <div className='bg-[#00000083] fixed top-0 h-screen w-full'></div> : null }
    <div id='menuref' className={`${showCart ? "translate-x-0" : "translate-x-full"} w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%] xl:w-[20%] transition-all duration-300 ease-in-out h-screen bg-[white] fixed shadow-2xl top-0 right-0 z-50`}>
    <div className='w-[90%] text-[20px] p-5 flex items-center'><button className='bg-[#c6c6c6] rounded-[30px] p-2'>
    <RxCross1 onClick={()=>toggleCart()} className='text-[30px] cursor-pointer'/></button></div>
    <div className='w-[90%] mx-auto flex flex-col items-center justify-center'>
    <div className='flex flex-col gap-3 w-full text-[20px] h-[80vh]'>
      { 
        cart.length == 0 ? <div className='h-[90vh] flex flex-col items-center justify-center text-[#2F9EED]'><MdOutlineRemoveShoppingCart className='text-[50px]'/><h2 className=' flex justify-center items-center'>Your Cart is Empty</h2></div> :
        cart.map((item:any, i:number) => {
          const {id, title, image, price} = item;
          return (
            <>
            <div key={i} className='relative w-full gap-2 flex items-center py-2 border-[1px] shadow-lg border-[#e7e7e7] rounded-lg p-3'>
              <img src={image} alt={title} className='w-[70px] h-[70px] rounded-[5px]' />
              <div>
                <h3 className='text-[16px] dark:text-[black]'>{title}</h3>
                <div className='flex items-center gap-5'>
                <p className='text-[red] text-[17px] dark:text-[black]'>${price}</p>
                <div className='flex items-center justify-center gap-1 absolute bottom-0 right-0 p-2'>
                <button> {item.quantity <= 1 ? <MdDelete onClick={()=>removeCart(item)} className='text-[red] text-[22px]'/>:<FaMinusCircle onClick={()=>{dispatch(DecrementQty(item))}} className='text-[red]'/>}</button>
                <p className='dark:text-[black] border-[1px] border-[#515050] rounded-md w-[40px] flex justify-center items-center'>{item.quantity}</p> 
                <button onClick={()=> dispatch(IncrementQty(item))}><FaPlusCircle className='text-[green]'/></button>
              </div>
                </div>
              </div>
            </div>
            </>
          ) 
        })
      } 
    </div>
    </div>
    <div className='p-3 absolute bottom-2 w-full'>
        {cart.length > 0 &&
        <div className='w-[full] mb-3'>
        <h3 className="font-semibold text-[20px]">Items: {totalQty}</h3>
        <h3 className="font-semibold text-[20px]">Total Amount : {TotalPrice}</h3>
        </div>
        }
      { cart.length == 0 ? 
      <button className='bg-[#c4c4c4] p-3 text-white w-full rounded-[10px]' disabled>Proceed to checkout</button> : 
      <button onClick={()=> navigate('/checkout')} className='bg-[#2F9EED] p-3 text-white w-full rounded-[10px]'>Proceed to checkout</button>
      }
      
    </div>
    </div>

        <div className='fixed bottom-5 right-5 bg-[gray] rounded-[30px] p-3'>
      {
          cart.length > 0 && 
      <span className='absolute right-0 top-0 animate-bounce bg-[#fd0707] text-white p-[10px] w-[10px] h-[10px] rounded-[30px] flex items-center justify-center'>{cart.length}</span>
      }
    <MdShoppingCart onClick={()=>toggleCart()} className='text-[30px] cursor-pointer dark:text-[black]'/>
    </div> 
    </>
  ):null
}

export default SlideCart
