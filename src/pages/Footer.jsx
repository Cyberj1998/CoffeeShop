import React from 'react'
import { FaWhatsapp, FaFacebookMessenger, FaTelegram, FaCopyright, FaArrowUp } from 'react-icons/fa'

const Footer = () => {

  const socials = [FaWhatsapp, FaFacebookMessenger, FaTelegram]

  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  }

  return (
    <section id='footer' className='bg-[#151515] h-[20vh] w-full flex justify-center items-center'>
      <div className='first-container-footer h-full w-[33%] flex flex-col items-center justify-start'>
        <div className='m-2'>
          <h4 className='text-[#fff] font-sans font-semibold text-[15px] uppercase'>Socials</h4>
          <div className='social-icons-container flex flex-row w-fit'>
          {
            socials.map((Element,index)=>(
            <Element key={index} className={`h-[30px] w-[30px] m-1 text-white`} />
            ))
          }
          </div>
        </div>
      </div>

      <div className='second-container-footer h-full w-[33%] flex justify-center items-start'>
        <div className='flex flex-row w-fit items-center m-5'>
        <FaCopyright className='text-white' /><h3 className='text-white'>All Rights Reserved</h3>
        </div>
      </div>

      <div className='third-container-footer h-full w-[33%] flex justify-center items-start'>
        <button onClick={()=>scrollToTop()} className='bg-[#2c2c2c] p-2 cursor-pointer h-[30px] w-[30px] flex justify-center items-center m-5'>
          <FaArrowUp className='text-white' />
        </button>
      </div>
    </section>
  )
}

export default Footer
