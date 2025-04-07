import React from 'react'
import { FaWhatsapp, FaFacebookMessenger, FaTelegram, FaLocationArrow } from 'react-icons/fa'
import Worker from '../assets/contact-delivery.png'
import { gsap } from 'gsap/gsap-core'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'


const Contact = () => {

  const socials = [FaWhatsapp, FaFacebookMessenger, FaTelegram]

  gsap.registerPlugin(ScrollTrigger);


  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const triggerAnimation = () => {
    gsap.fromTo(
      '#worker-image',
      { opacity: 0, y: -100 },
      {
          opacity: 1,
          y: 0,
          scrollTrigger: {
              trigger: '#contact-section',
              start: isMobile ? "top top" : "top top",
              end: isMobile ? "bottom bottom" : "bottom bottom",
              scrub: 1,
          },
      },
      '#circular-shape-contact',
      { opacity: 0},
      {
          opacity: 1,
          scrollTrigger: {
              trigger: '#contact-section',
              start: isMobile ? "top top" : "bottom bottom",
              end: isMobile ? "bottom bottom" : "bottom bottom",
              scrub: 1,
          },
      }
    );
  }


  useEffect(()=>{
    triggerAnimation()
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  },[])

  return (
    <section id='contact' className='h-[100vh] max-md:h-fit w-full bg-[#2c2c2c] flex flex-col justify-center items-center'>
      <div className='text-container w-full h-[30%] flex justify-center items-center'>
        <h3 className='uppercase text-[#fff] text-[100px] max-md:text-[70px] max-sm:text-[60px] font-sans font-semibold'>Contact us</h3>
      </div>

      <div className='content-container w-full h-[70%] flex flex-row max-md:flex-col justify-center items-center'>
        <div className='left-container w-[33%] h-full max-md:w-full max-md:h-[33%] flex flex-col justify-evenly items-end max-md:items-center'>
          <div className='socials-container flex flex-col justify-center items-center w-fit'>
            <h2 className='text-[#fff] font-sans font-semibold text-[20px] uppercase'>Write Us</h2>
            <div className='social-icons-container flex flex-row'>
              {
                socials.map((Element,index)=>(
                  <Element key={index} className={`h-[30px] w-[30px] m-1 text-white`} />
                ))
              }
            </div>
          </div>
          <div className='location-container flex flex-col justify-center items-center -[2px] w-fit'>
            <h2 className='text-[#fff] font-sans font-semibold text-[20px]'>Location</h2>
            <p className='text-[#fff] text-[12px]'>howarts-mordor-luthadel <br />av.moon #15</p>
            <FaLocationArrow  className='text-white'/>
          </div>
        </div>
        {/*-------------------------------------------------*/}
        <div className='center-container max-sm:hidden w-[33%] h-full max-md:w-full max-md:h-[33%] flex justify-center items-center'>
          <div id='circular-shape-contact' className='circular-shape-contact bg-gradient-to-r from-[#57249b] to-[#417ee0] h-[300px] max-md:h-[200px] w-[300px] max-md:w-[200px] rounded-full flex justify-center items-center'>
            <img src={Worker} alt="worker" id='worker-image' className='worker-image h-[350px] max-md:h-[150px] w-[250px] max-md:w-[120px] -mt-[100px] max-md:-mt-[20px]' />
          </div>
        </div>
        {/*-------------------------------------------------*/}
        <div className='right-container w-[33%] h-full max-md:w-full max-md:h-[33%] flex flex-col justify-evenly items-start max-md:items-center'>
          <div className='socials-container flex flex-col justify-center items-center w-fit'>
            <h2 className='text-[#fff] font-sans font-semibold text-[20px] uppercase'>Delivery</h2>
            <p className='text-[#fff] text-[12px]'>+54-58-56-87-89</p>
          </div>
          <div className='location-container flex flex-col justify-center items-center -[2px] w-fit'>
            <h2 className='text-[#fff] font-sans font-semibold text-[20px]'>Location</h2>
            <p className='text-[#fff] text-[12px]'>monday sunday <br />9:00-am 10:00-pm</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
