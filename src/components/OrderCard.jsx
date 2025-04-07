import React from 'react'

//--------------------Supabase Imports-------------------------
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const OrderCard = ({ order }) => {

  const handleDeleteOrder = async (id) => {

    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
    if (sessionError) {
      console.error('Error fetching session:', sessionError.message);
      return; 
    }
  
    if (!session) {
      console.error('User not authenticated. Please log in to delete data.');
      return; 
    }
  
    const { data, error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
  
    if (error) {
      console.error('Error deleting data:', error);
    } else {
      console.log('Data deleted successfully');
    }
  }

  return (
    <div className='w-[80%] h-fit flex flex-row bg-gradient-to-r from-green-500 to-green-300 m-2 justify-between'>
      <div className='w-fit flex flex-col items-start text-black text-[20px] font-sans font-semibold p-[5px]'>
        <p>{`mesa - ${order.mesa}`}</p>
        {Array.isArray(order.products) && order.products.map((product, index) => (
          <span key={index}>{`${product.name} - ${product.quantity} - $${product.price}`}<br /></span>
        ))}
        <h2>total: ${order.total}</h2>
      </div>
      <button
        onClick={()=>handleDeleteOrder(order.id)} 
        className='text-red-500 font-sans font-semibold text-[20px] m-[10px] border-[2px] border-red-500 rounded-full h-[50px] w-[50px] cursor-pointer'
      >
        X
      </button>
    </div>
  )
}



export default OrderCard
