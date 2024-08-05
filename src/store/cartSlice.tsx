import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart:[],
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers:{
    addtocart(state:any, data:any) {
      console.log(data)
      state.cart.push(data.payload)

  },
    removeFromCart:(state:any, data:any) => {
     state.cart = state.cart.filter((item:any)=> item.id != data.payload.id);
    },
    IncrementQty:(state:any, data:any) => {
      state.cart = state.cart.map((item:any) => {
        if (item.id === data.payload.id) {
            item.quantity++;
        }
        return item;
    });
    },
    decrementQty:(state:any, data:any) => {
      state.cart = state.cart.map((item:any) => {
        if (item.id === data.payload.id) {
            item.quantity--;
        }
        return item;
    });
    },
  },
})

export const { addtocart, removeFromCart, IncrementQty, decrementQty} = cartSlice.actions

export default cartSlice.reducer