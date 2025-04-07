import React, { useState, useEffect } from 'react'
import { products } from '../store'
import ProductCard from '../components/ProductCard'
import PopularProductCard from '../components/PopularProductCard'

//-----------------Supabase Imports----------------------------------

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const Store = () => {

  const[productsData,setProductsData]=useState([])

  const fetchData = async () => {

    let { data: cafeteria, error } = await supabase
      .from('cafeteria')
      .select('*')

    if (error) {
      console.error(error);
    } else {
      console.log(cafeteria);
      setProductsData(cafeteria)
    }
  };

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <section id='store' className='bg-[#2c2c2c] h-fit w-full flex flex-col justify-center items-center'>
      <h4 className='text-[30px] font-sans font-semibold text-[#fff] uppercase'>Popular Products</h4>
      <p className='text-[#417ee0] font-sans font-semibold text-[15px] max-md:text-[12px]'>This is our best selling products</p>
      <div className='popular-container h-[60vh] max-md:h-fit w-full flex flex-wrap justify-center items-center mt-[80px]'>
        <div className='h-full w-[90%] flex flex-row justify-center items-center'>
          {products.map((product)=>(
            product.status === 'popular' ?(
              <PopularProductCard 
                product={product}
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                status={product.status}
                image={product.img}
              />
            ):
            (
              ''
            )
          ))}
        </div>
      </div>
      <h3 className='text-[30px] font-sans font-semibold text-[#fff] uppercase mt-[55px]'>Our Products</h3>
      <p className='text-[#417ee0] font-sans font-semibold text-[15px] max-md:text-[12px]'>pick your favorite drink and enjoy</p>
      <div className='products-container flex flex-wrap justify-center items-center w-[70%]'>
        {products.map((product)=>(
          product.status != 'popular' ?(
            <ProductCard 
            product={product}
            key={product.id}
            name={product.name}
            price={product.price}
            status={product.status}
            image={product.img}
            />
          ):
          (
            ''
          )
        ))}
      </div>
    </section>
  )
}




export default Store