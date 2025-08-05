import React from 'react'
import Ice from '../assets/ice-img.png'
import Leaf from '../assets/leaf-img.png'
import BlueBerry from '../assets/BlueBerries.png'
import { FaShoppingCart } from 'react-icons/fa'

//---------Redux Store Imports--------------------

import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

const ProductCard = ({ name, price, status, image, product }) => {

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className='group bg-[#151515] border border-[#57249b] from-[#57249b] to-[#417ee0] rounded-2xl h-[330px] w-[250px] m-2 flex flex-col justify-center items-center'>
      <div className='image-container w-full h-[70%] flex flex-col justify-center items-center'>
        <div className='green-shape-product bg-gradient-to-r from-[#57249b] to-[#417ee0] w-[80%] h-[80px] rounded-bl-full rounded-br-full relative mt-[6rem] z-1' />
        <img src={image} alt="coffee-image" className='h-[190px] w-[100px] absolute z-2' />
        <img 
          src={Ice} 
          alt="ice" 
          className='h-[40px] z-3 absolute ml-[5rem] rotate-50 transition-transform duration-200 group-hover:translate-y-[-5px]' 
        />
        <img 
          src={Ice} 
          alt="leaf" 
          className='h-[50px] z-3 absolute -rotate-200 mt-[8rem] mr-[6rem] transition-transform duration-200 group-hover:translate-y-[-5px]' 
        />
      </div>

      <div className='info-container w-full h-[30%] flex flex-col justify-between'>
        <h3 className='text-[20px] text-[#fff] font-sans font-bold max-md:text-[15px]'>{name}</h3>
        <div className='flex flex-row justify-between items-center'>
          <p className='m-2 text-[#417ee0] font-sans text-[20px] font-semibold'>${price}</p>
          <button onClick={()=>handleAddToCart(product)} className='m-2 border-white rounded-full h-[40px] w-[40px] cursor-pointer border flex justify-center items-center'>
            <FaShoppingCart className='text-white w-[20px] h-[20px]' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
