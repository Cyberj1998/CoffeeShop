import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductCardCart = ({ product }) => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(state => state.cart.cartItems);

  const itemInCart = cartItems.find(item => item.id === product.id);
  const quantity = itemInCart ? itemInCart.quantity : 0; 

  const totalPrice = (quantity * product.price).toFixed(2);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product));
  };

  return (
    <div className='group bg-[#2c2c2c] rounded-2xl border border-white h-[80px] w-[90%] m-2 flex flex-row justify-between items-center'>
      <div className='h-full w-[20%] flex flex-col justify-center items-center'>
        <img src={product.img} alt="product-image" className='h-[50px] w-[40px]' />
        <p className='text-[#fff] font-sans font-semibold text-[15px] max-md:text-[11px]'>{product.name}</p>
      </div>

      <div className='h-full w-[40%] flex flex-row justify-around items-center'>
        <FaArrowLeft className='text-[25px] text-white cursor-pointer' onClick={handleDecreaseQuantity} />
        <p className='text-[#fff] text-[20px]'>{quantity}</p> {/* Display the quantity here */}
        <FaArrowRight className='text-[25px] text-white cursor-pointer' onClick={handleIncreaseQuantity} />
      </div>

      <div className='info-container w-fit h-full flex flex-row justify-center items-center'>
        <p className='m-2 text-[#fff] font-sans text-[20px] max-md:text-[15px] font-semibold'>${totalPrice} cup</p> {/* Display total price here */}
        <button onClick={handleRemoveFromCart} className='m-2 rounded-full h-[40px] w-[40px] cursor-pointer border border-white flex justify-center items-center'>
          <h3 className='font-sans font-bold text-[#f32828] text-[20px]'>X</h3>
        </button>
      </div>
    </div>
  );
};

export default ProductCardCart;
