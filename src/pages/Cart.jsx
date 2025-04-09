import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import ProductCardCart from '../components/ProductCardCart';

//------------------------------------------------------------

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Cart = () => {

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart.cartItems);
  const cartJson = JSON.stringify(cart);
  const cartTotalMoneyAmount = useSelector(state => state.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

  const[table,setTable]=useState(1)

  useEffect(()=>{
    console.log(cart)
  },[])

  //---------------------------handle Clean Cart------------------

  const handleCleanCart = () => {
    dispatch(clearCart())
  }

  //--------------------------insert order function---------------
  const insertOrder = async () => {

    const { data, error } = await supabase
      .from('orders')
      .insert([
        { products: cartJson, total: cartTotalMoneyAmount, mesa: table },
      ]);
    
    if (error) {
      console.error('Error inserting data:', error);
      alert(`Error: ${error.message}`);
    } else {
      console.log('Data inserted successfully:', data);
      alert('Order Send Succefully')
      handleCleanCart()
    }
  }


  return (
    <div className='h-[100vh] w-full bg-[#151515] flex flex-col justify-center'>
      <div className='h-[80%] mt-[50px] w-full flex flex-col justify-start items-center overflow-y-scroll'>
        {cart.map((product)=>(
          <ProductCardCart
            key={product.id}
            quantity={product.quantity} 
            name={product.name}
            price={product.price}
            image={product.img}
            product={product}
          />
        ))}
      </div>
      <div className='h-[80px] w-full bottom-0 border border-[#fff] flex flex-row justify-around items-center'>
        <h3 className='text-[#fff] font-sans font-semibold text-left'>
          Total Products: {cartTotalQuantity} <br /> Total Money: ${cartTotalMoneyAmount}cup
        </h3>
        <div className='flex flex-row'>
          <h3 className='text-white font-sans font-semibold m-2'>mesa - </h3>
          <select
            id="status"
            type='text'
            onChange={(e) => setTable(Number(e.target.value))} 
            className="appearance-none cursor-pointer bg-white border rounded w-[100px] max-md:w-[60px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
          </select>
        </div>
        <button 
          onClick={()=>insertOrder()} 
          className='text-[#fff] bg-gradient-to-r from-[#57249b] to-[#417ee0] h-[40px] w-[100px] cursor-pointer'
        >
          Order
        </button>
      </div>
    </div>
  )
}





export default Cart
