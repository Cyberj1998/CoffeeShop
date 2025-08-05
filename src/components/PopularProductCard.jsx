import Ice from '../assets/ice-img.png'
import Seal from '../assets/home-sticker.svg'
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice'


const PopularProductCard = ({ name, price, image, description, id, product }) => {

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };


  return (
      <div className={`group relative bg-transparent border border-white rounded-2xl h-[450px] w-[230px] m-2 flex flex-col justify-center items-center ${id === 2 ? '-mt-[20px]' : ''}`}>
        {id === 2 ? (
          <img src={Seal} alt="seal" className='h-[80px] z-10 -mt-[365px] max-md:h-[60px] absolute' />
        ) : (
          ''
        )}
        <div className='image-container relative w-full h-[70%] flex flex-col justify-center items-center'>
          <div className='green-shape-product bg-gradient-to-r from-[#57249b] to-[#417ee0] w-[80%] h-[80px] rounded-bl-full rounded-br-full relative mt-[6rem] z-1' />
          <img 
            src={image} 
            alt="coffee-image" 
            className='h-[190px] w-[100px] absolute z-2' 
          />
          <img 
            src={Ice} 
            alt="ice" 
            className='h-[40px] z-3 absolute ml-[4rem] rotate-50 transition-transform duration-200 group-hover:translate-y-[-5px]' 
          />
          <img 
            src={Ice} 
            alt="leaf" 
            className='h-[50px] z-3 absolute -rotate-200 mt-[8rem] mr-[6rem] transition-transform duration-200 group-hover:translate-y-[-5px]' 
          />
        </div>

        <div className='info-container w-full h-[30%] flex flex-col justify-between'>
          <h3 className='text-[20px] text-[#fff] font-sans font-bold max-md:text-[15px]'>{name}</h3>
          <p className='text-[#fff] text-[12px]'>{description}</p>
          <div className='bg-gradient-to-r from-[#57249b] to-[#417ee0] flex flex-row justify-between items-center rounded-bl-2xl rounded-br-2xl cursor-pointer'>
            <p className='m-2 text-[#fff] font-sans text-[20px] font-semibold'>${price}</p>
            <button onClick={()=>handleAddToCart()} className='m-2 rounded-full h-[40px] w-[40px] cursor-pointer border flex justify-center items-center'>
              <FaShoppingCart className='text-black w-[20px] h-[20px]' />
            </button>
          </div>
        </div>
      </div>
  )
}




export default PopularProductCard
