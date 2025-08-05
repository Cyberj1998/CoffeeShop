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


  const headerTitles = ['Home', 'Store', 'About', 'Contact', 'Admin']

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
      <header className={`fixed overflow-y-hidden max-md:fixed w-full overflow-x-hidden m-auto ${movileMenu ? 'h-[250px]' : 'h-[50px]'} flex justify-center items-center max-md:justify-start transition-all duration-500 z-500 backdrop-blur-[10px]`}>
          <div className='max-md:flex flex-col hidden w-full h-full justify-between items-center overflow-hidden'>
            <div className='flex flex-row justify-between items-center h-[50px] w-full'>
              <FaBars 
                size={25} 
                className='m-5 cursor-pointer text-white' 
                onClick={handleMovileMenu}
              />
              <a href="#" className='m-5 uppercase text-[20px] mr-[80px] font-sans font-semibold text-[#fff]'>Starcoffe</a>
            </div>
            <div className='w-full h-full bg-[#353535]'>
              <ul className='flex flex-col justify-center items-center'>
                {
                  headerTitles.map((title, index)=>(
                    title === 'Admin'
                    ? <Link to={`/${title}`} key={index} className={`m-2 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</Link>
                    : <a key={index} href={`#${title}`} className={`m-2 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</a>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className='max-md:hidden w-[80%] h-[50px] flex flex-row justify-between items-center'>
            <a href="#" className='uppercase text-[20px] font-sans font-semibold text-[#fff]'>Starcoffe</a>
            <ul className='flex flex-row'>
              {
                headerTitles.map((title, index)=>(
                  title === 'Admin'
                  ? <Link to={`/${title}`} key={index} className={`m-2 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</Link>
                  : <a key={index} href={`#${title}`} className={`m-2 ${title === 'Home' ? 'uppercase bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500' : 'uppercase text-[#e6ece9] hover:text-[#fff] text-[15px] font-sans font-semibold cursor-pointer transition-all duration-500'}`}>{title}</a>
                ))
              }
            </ul>
          </div>
          <Link to='/cart'>
            <div className='cart-icon-container absolute top-0 right-0 mr-[20px] cursor-pointer flex flex-row rounded-full justify-center items-center border w-[50px] h-[50px]'>
              <h3 id='quantity' className='text-[#fff] font-sans font-bold text-[20px]'>{cartTotalQuantity}</h3>
              <FaShoppingCart className='w-[20px] text-white' />
            </div>
          </Link>
      </header>
  )
}

export default Header
