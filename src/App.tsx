import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useState } from 'react';
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { FaPlusCircle, FaMinusCircle} from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { decrementQty, IncrementQty, removeFromCart } from './store/cartSlice';
import { MdDelete } from "react-icons/md";

function App() {
  const dispatch = useDispatch()
  const cart = useSelector((state:any) => state.cart); 
  const [showCart, setShowCart] = useState(false);
  const isAuth = localStorage.getItem('isLogin');
  const toggleCart = () => setShowCart(!showCart);

  return (
    <>
    <Header />
    <Outlet/>
    <ToastContainer/>

    <div className={`${showCart ? "translate-x-0" : "translate-x-full"} sm:w-[50%] md:w-[40%] lg:w-[40%] xl:w-[20%] transition-all duration-300 ease-in-out h-screen bg-[white] fixed shadow-2xl top-0 right-0 z-50`}>
    <div className='w-[90%] text-[20px] p-5 flex justify-end items-center'><RxCross1 onClick={()=>toggleCart()} className='text-[30px] cursor-pointer' /></div>
    <div className='w-[90%] mx-auto flex flex-col items-center justify-center'>
    <div key={cart.id} className='flex flex-col gap-3 w-full text-[20px] h-[85vh] overflow-y-scroll'>
      { 
        cart.length == 0 ? <div className='h-[90vh] flex flex-col items-center justify-center text-[#2F9EED]'><MdOutlineRemoveShoppingCart className='text-[50px]'/><h2 className=' flex justify-center items-center'>Your Cart is Empty</h2></div> :
        cart.map((item:any, i:number) => {
          const {id, title, image, price} = item;
          return (
            <>
            <div key={i} className='w-full gap-2 flex items-center justify-between py-2 border-[1px] shadow-lg border-[#e7e7e7] rounded-lg p-3'>
              <img src={image} alt={title} className='w-[70px] h-[70px] rounded-[5px]' />
              <div>
                <h3 className='text-[16px]'>{title}</h3>
                <div className='flex items-center gap-5'>
                <p className='text-[red] text-[17px]'>${price}</p>
                <div className='flex items-center justify-center gap-3 border-[1px] shadow-lg border-[#e7e7e7] rounded-lg px-2 py-1'>
                <button> {item.quantity <= 1 ? <MdDelete onClick={()=>{dispatch(removeFromCart(item))}} className='text-[red] text-[22px]'/>:<FaMinusCircle onClick={()=>{dispatch(decrementQty(item.id))}} className='text-[red]'/>}</button>
                <p>{item.quantity}</p> 
                <button onClick={()=> dispatch(IncrementQty(item.id))}><FaPlusCircle className='text-[green]'/></button>
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
      { cart.length == 0 ? 
      <button className='bg-[#c4c4c4] p-3 text-white w-full rounded-[10px]' disabled>Check Out</button> : 
      <button className='bg-[#2F9EED] p-3 text-white w-full rounded-[10px]'>Check Out</button>
      }
      
    </div>
    </div>
    { isAuth ?
      <div className='fixed bottom-5 right-5 bg-[gray] rounded-[30px] p-3'>
      {
        cart.length > 0 && 
      <span className='absolute right-0 top-0 animate-bounce bg-[#fd0707] text-white p-[10px] w-[10px] h-[10px] rounded-[30px] flex items-center justify-center'>{cart.length}</span>
      }
    <MdShoppingCart onClick={()=>toggleCart()} className='text-[30px] cursor-pointer'/>
    </div> : null
    }
    </>
  );
}

export default App;
