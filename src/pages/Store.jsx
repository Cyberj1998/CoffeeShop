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
  const[productType,setProductType]=useState('drink')

  //------------------Fetch Coffees--------------------------
  const fetchData = async () => {
  let { data: cafeteria, error } = await supabase
    .from('cafeteria')
    .select('*')
    .eq('type', productType);

  if (error) {
    console.error(error);
  } else {
    setProductsData(cafeteria);
  }
};

useEffect(() => {
  console.log(`el productType cambio a: ${productType}`)
  fetchData();
}, [productType]);




  return (
    <section id='Store' className='bg-[#2c2c2c] h-fit w-full flex flex-col justify-center items-center'>
      <h4 className='text-[30px] font-sans font-semibold text-[#fff] uppercase'>Popular Products</h4>
      <p className='text-[#417ee0] font-sans font-semibold text-[15px] max-md:text-[12px]'>This is our best selling products</p>
      <div className='w-full h-fit overflow-x-scroll flex justify-center max-md:justify-start'>
        <div className='h-fit w-fit flex flex-row justify-center items-center mt-15'>
          {productsData.map((product)=>(
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
      <p className='text-[#417ee0] font-sans font-semibold text-[15px] max-md:text-[12px]'>pick your favorite drink, icecream or dessert and enjoy</p>
      <div className='border border-[#57249b] rounded-2xl h-[70px] w-[400px] max-md:w-[300px] flex flex-row justify-evenly items-center'>
        <button 
          onClick={() => setProductType('drink')} 
          className='bg-[#4a4646] h-[50px] w-[85px] rounded-2xl flex justify-center items-center cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 32 32"><g fill="none"><path fill="#ca0b4a" d="M15.25 2.75A.75.75 0 0 1 16 2h4v1.5h-3.25V8a.75.75 0 0 1-1.5 0z"/><path fill="#990838" d="M20.5 2.75c0 .414-.224.75-.5.75s-.5-.336-.5-.75s.224-.75.5-.75s.5.336.5.75"/><path fill="#cdc4d6" d="m11 9l.5-1l.007-.013C11.75 7.507 12.009 7 13 7h6c1 0 1.263.509 1.5 1l.5 1v1H11zM9.5 29l-.916-11l.198-.141l7.2-3.466l7.202 3.466l.233.141l-.917 11c-.04.556-.5 1-1 1h-11c-.5 0-.935-.45-1-1"/><path fill="#e5336d" d="M23.417 18H8.583L8 11l8-.5l8 .5z"/><path fill="#f3eef8" d="M7 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1"/></g></svg>
        </button>
        <button 
          onClick={() => setProductType('dessert')} 
          className='bg-[#4a4646] h-[50px] w-[85px] rounded-2xl flex justify-center items-center cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="#e19747" d="m3.627 29.82l24.63-7.068l.787-.724V7.978l-1.022-1.98l-25.95 7.345v14.944c0 1.225.496 1.785 1.555 1.532"/><path fill="#ffdea7" d="m13.034 2.508l-9.97 9.223c-1.946 1.662-.935 2.811.934 2.399l23.026-6.606c.592-.14.966-.186.966.499v4.02c0 .687.064 1.045-.374 1.183c0 0-22.205 6.694-22.683 6.824s-1.54.328-1.87.28c-.329-.048-.747-.28-.934-.28s-.187.108-.187.623v2.167c0 .163.14.268.14.268a2.48 2.48 0 0 0 1.916.307l23.244-6.73c.374-.094.748.156.748.623v5.298c0 .322.195.339.332.322c.992-.286 1.678-.873 1.678-1.881V8.023c0-.853-.617-2.278-2.01-2.71L16.96 2.725c-1.047-.218-3.072-.88-3.926-.218"/><path fill="#f8312f" d="M12.024 4.517c.126-.628.335-2.402 2.516-2.836l2.356 1.207l.858 2.575C16.95 7.624 15.29 7.47 14.627 7.47h-1.963c-.64 0-1.004-.364-.916-1.033z"/><path fill="#86d72f" d="M16.94 4.372c-.44-.495-.32-1.25-.32-1.25s-.714 0-1.062-.38l-1.193-1.235c-.064-.088 0-.183.088-.248c0 0 .701-.531 1.789.16c.602.444 1.746 1.862 2.036 2.458c.527.9-.146 1.673-.146 1.673c-.077.095-.167.122-.276 0z"/></g></svg>
        </button>
        <button 
          onClick={() => setProductType('icecream')} 
          className='bg-[#4a4646] h-[50px] w-[85px] rounded-2xl flex justify-center items-center cursor-pointer'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="#ffdea7" d="m8 18l-1.32-2.37c.109-.05.196-.332.3-.391c.854-.494 1.28-1.074 1.583-2.029c.23-.74 1.167-1.446 1.928-1.446s1.617.726 1.847 1.446c.51 1.62 1.824 2.597 3.614 2.597s3.105-.987 3.615-2.597c.23-.73 1.143-1.446 1.903-1.446s1.615.726 1.845 1.446c.298.94.87 1.538 1.704 2.029c.116.068.178.335.301.391L24 18l-.551.244H8.563z"/><path fill="#ff6dc6" d="M16 2C10.48 2 6 6.48 6 12c0 1.28.24 2.5.68 3.63a4 4 0 0 0 2.13-2.41c.23-.74.92-1.22 1.68-1.22s1.45.49 1.68 1.21A3.99 3.99 0 0 0 15.98 16c1.79 0 3.3-1.17 3.81-2.78c.23-.73.92-1.21 1.68-1.21h.04c.76 0 1.45.49 1.68 1.21a3.98 3.98 0 0 0 2.13 2.41c.44-1.13.68-2.35.68-3.63c-.01-5.52-4.48-10-10-10"/><path fill="#fbb8ab" d="M14.31 5.94a1.01 1.01 0 1 0 0-2.02a1.01 1.01 0 0 0 0 2.02m-3.35 1.45a1.01 1.01 0 1 0 0-2.02a1.01 1.01 0 0 0 0 2.02m4.01 1.06a1.01 1.01 0 1 1-2.02 0a1.01 1.01 0 0 1 2.02 0"/><path fill="#00a6ed" d="M25.1 8c.66 0 1.09.69.8 1.28l-4.325 8.91h-1.98L24.3 8.5c.15-.31.47-.5.8-.5"/><path fill="#26eafc" d="m8 18l7.41 11.68a.7.7 0 0 0 1.18 0L24 18z"/></g></svg>
        </button>
      </div>
      <div className='products-container max-md:w-full flex flex-wrap justify-center items-center w-[70%]'>
        {productsData.map((product)=>(
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