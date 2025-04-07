import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

//-----------------------Supabase Imports-------------------------

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const ProductCardAdmin = ({ product }) => {

  //--------------------------Delete Function--------------------------

  const deleteData = async (name) => {

    console.log(`this is the name that is entering the function${name}`)
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
        .from('cafeteria')
        .delete()
        .eq('name', name);

    if (error) {
        console.error('Error deleting data:', error.message);
    } else {
        console.log('Data deleted successfully:', data);
        console.log(`this is the name used to deleted the data${name}`)
    }
  }

  //-------------------------Edit Function-------------------------

  const[editing,setEditing]=useState(false)
  const [price, setPrice] = useState(product.price)


  const editPrice = () => {
    setEditing(true); 
  };

  const setEditedPrice = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.error('Error fetching session:', sessionError.message);
        return; 
    }

    if (!session) {
        console.error('User not authenticated. Please log in to update data.');
        return; 
    }

    if (editing) {

        const parsedPrice = parseFloat(price);

        if (!isNaN(parsedPrice)) {
            try {
                console.log('Updating price to:', parsedPrice, 'for product ID:', product.id);
                const { error } = await supabase
                    .from('cafeteria')
                    .update({ price: parsedPrice })  // Use parsedPrice here
                    .eq('id', product.id);

                if (error) {
                    console.log("Error updating price:", error.message);
                } else {
                    // Fetch the updated data
                    const { data: updatedData, error: fetchError } = await supabase
                        .from('cafeteria')
                        .select('price')
                        .eq('id', product.id)
                        .single();

                    if (fetchError) {
                        console.error("Error fetching updated data:", fetchError.message);
                    } else {
                        console.log("Updated data:", updatedData);
                    }
                    setEditing(false);
                }
            } catch (error) {
                console.error("Error during update:", error.message);
            }
        } else {
            console.error("Invalid price value. Please enter a valid number.");
        }
    }
  };


  return (
    <div id='main_container' className='group border border-black rounded-[5px] h-[80px] w-[90%] m-2 flex flex-row justify-between items-center'>
      <div className='h-full w-fit max-md:w-[50px] flex flex-row max-md:flex-col justify-center items-center'>
        <img src={product.img} alt="product-image" className='h-[50px] w-[40px]' />
        <p className='text-[#212121] font-sans font-semibold text-[15px] max-md:text-[11px]'>{product.name}</p>
      </div>

      <div>
        {!editing ? (
          <button 
            onClick={editPrice} 
            className='h-full w-[100px] bg-[#288e64] cursor-pointer text-[#fff] font-sans font-semibold'
          >
            Editar
          </button>
        )
        : (
          <button 
            onClick={setEditedPrice} 
            className='h-full w-[100px] bg-[#288e64] cursor-pointer text-[#fff] font-sans font-semibold'
          >
            Guardar
          </button>
        )
        }
      </div>

      <div className='info-container w-[200px] max-md:w-fit h-full flex flex-row justify-between items-center'>
        <input 
          type="number" 
          step="0.01" 
          disabled={!editing}
          value={price}
          onChange={e => setPrice(parseFloat(e.target.value))} 
          className='m-2 text-[#212121] w-[100px] max-md:w-[50px] font-sans text-[20px] max-md:text-[15px] font-semibold'
        />
        <button onClick={() => deleteData(product.name)} className='m-2 rounded-full h-[40px] w-[40px] cursor-pointer border flex justify-center items-center'>
          <h3 className='font-sans font-bold text-[#f32828] text-[20px]'>X</h3>
        </button>
      </div>
    </div>
  );
};


export default ProductCardAdmin;
