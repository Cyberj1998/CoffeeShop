import React from 'react'
import { useState, useEffect } from 'react'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

const Header = () => {

  var tl = gsap.timeline();

const animationCart = () => {
  tl.to("#quantity", {
    x: -10,
    duration: 0.1,
    ease: "power1.inOut"
  })
  .to("#quantity", {
    x: 10,
    duration: 0.1,
    ease: "power1.inOut"
  })
  .to("#quantity", {
    x: -5,
    duration: 0.1,
    ease: "power1.inOut"
  })
  .to("#quantity", {
    x: 5,
    duration: 0.1,
    ease: "power1.inOut"
  })
  .to("#quantity", {
    x: 0, 
    duration: 0.1,
    ease: "power1.inOut"
  });
}


  const headerTitles = ['home', 'popular', 'products', 'about us', 'contact', 'admin']

  const cartTotalQuantity = useSelector(state => state.cart.cartTotalQuantity);

  const[movileMenu,setMovileMenu]=useState(false)

  const handleMovileMenu = () => {
    setMovileMenu(prevState => !prevState)
  }

  useEffect(() => {
    const handleResize = () => {
    if (window.innerWidth > 768) { 
      setMovileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(()=>{
    animationCart()
  },[cartTotalQuantity])

  return (
      <header className={`fixed w-full m-auto ${movileMenu ? 'h-[250px]' : 'h-[50px]'} flex justify-center items-center max-md:justify-start transition-all duration-500 z-500 backdrop-blur-[10px]`}>
          <div className='max-md:flex flex-col hidden w-full h-full justify-between items-start overflow-hidden'>
            <div className='flex flex-row justify-between h-[50px] w-full'>
              <FaBars 
                size={25} 
                className='m-5 cursor-pointer text-white' 
                onClick={handleMovileMenu}
              />
              <a href="#" className='m-5 uppercase text-[20px] font-sans font-semibold text-[#fff]'>Starcoffe</a>
            </div>
            <div className='w-full h-full bg-[#353535]'>
              <div className='flex flex-col justify-center items-center'>
                {
                  headerTitles.map((title, index)=>(
                    <a href={title} key={index} className={`m-2 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</a>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='max-md:hidden w-[80%] h-[50px] flex flex-row justify-between items-center'>
            <a href="#" className='uppercase text-[20px] font-sans font-semibold text-[#fff]'>Starcoffe</a>
            <ul className='flex flex-row'>
              {
                headerTitles.map((title, index)=>(
                  <Link key={index} to={title === 'Admin' ? '/admin' : ''} className={`m-5 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</Link>
                ))
              }
            </ul>
          </div>
          <Link to='/cart'>
            <div className='cart-icon-container cursor-pointer flex flex-row rounded-full justify-center items-center border w-[50px] h-[50px]'>
              <h3 id='quantity' className='text-[#fff] font-sans font-bold text-[20px]'>{cartTotalQuantity}</h3>
              <FaShoppingCart className='w-[20px] text-white' />
            </div>
          </Link>
      </header>
  )
}

export default Header
