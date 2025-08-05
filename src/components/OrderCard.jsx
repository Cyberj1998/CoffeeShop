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

// Dentro del componente o justo antes de renderizar:
const productsArray = typeof order.products === 'string' ? JSON.parse(order.products) : order.products;

return (
  <div className="w-[80%] bg-white shadow-lg rounded-lg p-6 m-4 flex justify-between items-center">
    <div className="flex flex-col space-y-2 text-gray-800">
      <p className="text-xl font-semibold">Mesa - {order.mesa}</p>
      {Array.isArray(productsArray) ? (
        productsArray.map((product, index) => (
          <span key={index} className="text-gray-600">
            {product.name} &times; {product.quantity} &mdash; ${product.price.toFixed(2)}
          </span>
        ))
      ) : (
        <p className="italic text-red-500">Productos no disponibles</p>
      )}
      <h2 className="mt-2 font-bold text-lg text-green-600">Total: ${order.total.toFixed(2)}</h2>
    </div>
    <button
      onClick={() => handleDeleteOrder(order.id)}
      className="text-white bg-red-500 hover:bg-red-600 transition cursor-pointer rounded-full h-12 w-12 flex items-center justify-center shadow-md"
      aria-label="Eliminar orden"
    >
      &#10005;
    </button>
  </div>
)
}



export default OrderCard
