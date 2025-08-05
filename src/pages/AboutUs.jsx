import React, { useEffect, useState } from 'react'
import CoffeeSack from '../assets/about-coffee.png'
import LatteGlass from '../assets/home-coffee.png'
import MilkShakePurple from '../assets/MilkShake-Leonardo-2.png'
import { gsap } from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AboutUs = () => {
  
  gsap.registerPlugin(ScrollTrigger);

  const triggerAnimation = () => {
    gsap.fromTo(
      '#circular-shape', 
      { opacity: 0 }, 
      {
        opacity: 1, 
        scrollTrigger: {
          trigger: '#about-us-section',
          start: "top top",
          end: "top+=100",
          toggleActions: "play none none reverse",
        },
      },
      '#coffee-sack',{
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0, 
        scrollTrigger: {
          trigger: '#about-us-section',
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
        },
      },
    );
  }

  useEffect(()=>{
    triggerAnimation()
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  },[])

  //--------------------Images Switch-----------------------------

  const [visibleImage, setVisibleImage] = useState(0);
  const images = [LatteGlass, MilkShakePurple];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section id='About' className='about-us-section bg-[#151515] h-[100vh] w-full flex flex-row max-md:flex-col justify-center items-center'> 
      
      <div className='h-full w-[50%] max-md:w-full max-md:h-[50%] flex flex-col justify-center items-start max-md:items-center'>
        <h3 className='text-[#fff] font-sans font-semibold text-[55px] uppercase m-5 max-md:text-[30px]'>Lear More <br /> <span className='bg-gradient-to-r from-[#57249b] to-[#417ee0] bg-clip-text text-transparent'>About</span> Us</h3>
        <p className='text-white font-sans text-[20px] max-md:text-[15px] max-sm:text-[12px] m-5 text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos quas laudantium quia quis excepturi officiis maiores provident ipsum exercitationem harum. Sed nisi nemo illo minus ratione? Deleniti iusto fuga odit?</p>
        <button className='bg-gradient-to-r from-[#57249b] to-[#417ee0] rounded-2xl p-3 text-[#fff] font-sans font-semibold cursor-pointer uppercase m-5'>
          The Best Coffee
        </button>     
      </div>

      <div className='h-full w-[50%] max-md:w-full max-md:h-[50%] flex flex-col justify-center items-center'>
        <div id='circular-shape' className='circular-shape bg-gradient-to-r from-[#57249b] to-[#417ee0] h-[400px] max-md:h-[300px] w-[400px] max-md:w-[300px] rounded-full flex justify-center items-center'>
          <img src={images[0]} alt="coffee" id='coffee-sack' className={`image ${visibleImage === 0 ? 'visible' : ''} h-[450px] max-md:h-[350px] w-[200px] max-md:w-[150px] rotate-15`} />
          <img src={images[1]} alt="milkshake" id='milkshake' className={`image ${visibleImage === 1 ? 'visible' : ''} h-[450px] max-md:h-[350px] -rotate-15`} />
        </div>
      </div>
    </section>
  )
}



export default AboutUs
