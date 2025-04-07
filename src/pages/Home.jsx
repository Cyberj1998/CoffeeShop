import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap';
import CoffeeHome from '../assets/home-coffee.png'
import MilkSakeHome from '../assets/MilkShake-Leonardo-1.png'
import BlueBerries from '../assets/BlueBerries.png'
import Splash from '../assets/home-splash.png'
import Ice from '../assets/ice-img.png'
import Leaf from '../assets/leaf-img.png'
import Bean from '../assets/bean-img.png'
import Seal from '../assets/home-sticker.svg'

const Home = () => {

  var tl = gsap.timeline();

  const[movileMenu,setMovileMenu]=useState(false)

  const width = window.innerWidth;
  console.log('Window width:', width);
  const newMovileMenuState = width < 768

  const animationGsap = () => {
    const splashHeight = newMovileMenuState ? 130 : 170; 
    const splashWidth = newMovileMenuState ? 230 : 400; 
    const ingredientHeight = newMovileMenuState ? 50 : 80; 

    tl.to(".green-shape", { duration: 1, y: -20, opacity: 1, duration: 1,ease: "power4.out", })
      .to(".coffee-home", { duration: 1, x: -50, y: 100, opacity: 1, duration:1, ease: "back.out(1.7)" })
      .to(".splash", { height: splashHeight, width: splashWidth,opacity: 1 })  
      .to(".ingredient", { height: ingredientHeight, opacity: 1, rotate: -5, duration:1, ease: "back.out(1.7)"})
      .to(".coffee-text", { duration: 1, opacity: 1, y: 70})
      .to(".last-animation", { duration: 1, opacity: 1 },"-=1")
  }

  const handleResize = () => {
    if (newMovileMenuState !== movileMenu) { 
        console.log('Changing movileMenu from', movileMenu, 'to', newMovileMenuState); 
        setMovileMenu(newMovileMenuState);
        animationGsap(); 
    }
    else{
      animationGsap()
    }
  };

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => {window.removeEventListener('resize', handleResize);}
  }, [newMovileMenuState]);
  



  return (
    <section id='store' className='bg-[#151515] h-[100vh] w-full flex justify-center items-center flex-col overflow-hidden'>
      <h2 className='coffee-text text-[#fff] text-[115px] font-bold font-sans w-full h-[30%] opacity-0 max-md:text-[80px] max-sm:text-[60px]'>C<span className='bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent'>o</span>ld c<span className='bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent'>o</span>ffee</h2>
      <div className='absolute-container w-full h-[70%] flex flex-row justify-center items-center max-md:flex-col'>
        <div className='hero-text-container h-full w-[33%] flex flex-col justify-center items-start max-md:w-full max-md:h-[50%] max-md:items-center'>
          <p className='last-animation opacity-0 text-[#fff] font-sans text-left m-5 text-[15px] max-md:text-[12px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas natus aliquid dolore mollitia. Repellendus, ullam deserunt. Quisquam cupiditate ullam inventore voluptatibus error aut praesentium maiores magnam laboriosam. Vel, tenetur tempora!</p>
          <button className='last-animation rounded-2xl opacity-0 bg-gradient-to-r from-[#57249b] to-[#417ee0] text-[#fff] font-sans font-semibold h-[50px] w-[100px] cursor-pointer m-5 mx-md:h-[40px] mx-md:w-[70px]'>Start</button>
        </div>
        {/*-----------------------------------------------------*/}
        <div className='hero-image-container border-violet-500 h-full w-[33%] flex flex-col justify-center items-center overflow-hidden max-md:w-full max-md:h-[50%]'>
          <div className='green-shape bg-gradient-to-r from-[#57249b] to-[#417ee0] h-[150px] w-[300px] rounded-bl-full rounded-br-full mt-[260px] opacity-0 max-md:w-[200px] max-md:h-[100px] max-md:mt-[120px]'/>
          <img src={MilkSakeHome} alt="coffee home" className='coffee-home h-[500px] w-[450px] absolute transform rotate-15 -mt-[250px] ml-[150px] opacity-0 z-1 max-md:h-[250px] max-md:w-[250px]' />
          <img src={Splash} alt="coffee_splash" className='splash h-0 w-0 opacity-0 absolute mt-[200px] rotate-15 max-md:h-[100px] max-md:w-[200px] max-md:mt-[100px]' />
          <img src={Ice} alt="ice" className='ingredient absolute h-0 opacity-0 z-2 ml-[15rem] -mt-[8rem] rotate-15 max-md:ml-[12rem]' />
          <img src={Ice} alt="ice" className='ingredient absolute h-0 opacity-0 z-2 -ml-[10rem] mt-[10rem] -rotate-15 max-md:-ml-[5rem]' />
          <img src={BlueBerries} alt="leaf" className='ingredient absolute h-0 opacity-0 -ml-[8rem] -mt-[15rem] -rotate-100 max-md:-ml-[3rem] max-md:-mt-[12rem]' />
          <img src={BlueBerries} alt="bean" className='ingredient absolute h-0 opacity-0 ml-[10rem] mt-[15rem] max-md:ml-[7rem] max-md:mt-[10rem]' />
        </div>
        {/*-----------------------------------------------------*/}
        <div className='seal-container h-full w-[33%] flex justify-start items-center max-md:hidden'>
          <img src={Seal} alt="seal" className='last-animation opacity-0 h-[100px] w-[100px] rotate-15' />
        </div>
      </div>
    </section>
  )
}



export default Home
