import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart:[],
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addtocart(state:any, data:any) {
      const existProduct = state.cart.find((item:any)=> item.id === data.payload.id);
      if(existProduct){
        state.cart = state.cart.map((item:any)=> item.id === data.payload.id ? {...item, quantity:item.quantity + 1} : item);
      }else{
        state.cart.push(data.payload);
      }
  },
    removeFromCart:(state:any, data:any) => {
     state.cart = state.cart.filter((item:any)=> item.id != data.payload.id);
    },
    IncrementQty:(state:any, data:any) => {
      state.cart = state.cart.map((item:any) => item.id === data.payload.id ? {...item,quantity : item.quantity + 1} : item);
    },
    DecrementQty:(state:any, data:any) => {
      state.cart = state.cart.map((item:any) => item.id === data.payload.id ? {...item,quantity : item.quantity - 1} : item);
    },
  
  },
})

export const { addtocart, removeFromCart, IncrementQty, DecrementQty} = cartSlice.actions

export default cartSlice.reducer