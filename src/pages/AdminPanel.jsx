import React, { useEffect, useState, useRef } from 'react';
import { products } from '../store'
import ProductCardAdmin from '../components/ProductCardAdmin'
import OrderCard from '../components/OrderCard';
import notification from '../assets/notification.mp3'
import { FaShoppingCart, FaBox, FaPlusCircle } from 'react-icons/fa';

//------------------Supabase Imports----------------


import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_UR; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


const AdminPanel = () => {

  const audio = new Audio(notification)

  const navigationOptions = ['Orders', 'Products', 'New']
  const[menuType,setMenuType]=useState('Orders')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [error, setError] = useState('');

  //----------------Todos los Productos State-------------
  const[productsData,setProductsData]=useState([])

  //---------------InsertRowStates----------------------------
  const[name,setName]=useState('')
  const[description,setDescription]=useState('')
  const[price,setPrice]=useState(null)
  const[status,setStatus]=useState('')
  const[img,setImg]=useState('')

  //------------------Handle Menu Function---------------------

  const handleMenu = (type) => {
    setMenuType(type)
  }


  //------------------SignUp Function----------------------------
  const signInUser = async (e) => {
    e.preventDefault(); 
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing in:', error.message);
      setError(error.message); 
    } else if (data.session) {
      console.log('User signed in:', data.user);
      console.log('Authenticated session:', data.session);
      setIsLoggedIn(true); 
      
      
      const token = data.session.access_token;
      
      localStorage.setItem('supabase_token', token);
    }
  };
  //----------------InsertRow Function----------------------------------------
  const InsertData = async (name, description, price, status, img) => {
 
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
        console.error('Error fetching session:', sessionError.message);
        return; 
    }

    if (!session) {
        console.error('User not authenticated. Please log in to insert data.');
        return; 
    }


    const { data, error } = await supabase
        .from('cafeteria')
        .insert([
            { name: name, description: description, price: price, status: status, img: img },
        ]);

    if (error) {
        console.error('Error inserting data:', error.message);
    } else {
        console.log('Data inserted successfully:', data);
    }
  }
  
  //cyberjay826@gmail.com
  //------------------FormLogic---------------------------------------
  const handleSubmitNewRow = (e) => {
    e.preventDefault()

    InsertData(name, description, price, status, img )
  }

  //-------------------FetchDataFunction---------------------------------

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

  //---------------------------Fetch Orders Function-----------------------------

  const[orders,setOrders]=useState([])
  

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();

    const channels = supabase.channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new;
          setOrders((prevOrders) => [...prevOrders, newOrder]);
          console.log(newOrder)
          audio.play();
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'orders' },
        (payload) => {
          const deletedOrderId = payload.old.id;
          setOrders((prevOrders) => prevOrders.filter(order => order.id !== deletedOrderId));
          console.log(`Order deleted: ${deletedOrderId}`);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  

  return (
    <div className='h-fit w-full bg-[#e5e5e5] flex flex-col justify-center items-center'>
      <div className='h-[100vh] w-full bg-[#e5e5e5] flex flex-row max-md:flex-col justify-center items-center'>
        {isLoggedIn ? (
          <>
            <div className='nav_admin h-full max-md:h-[50px] w-[50px] max-md:w-full border  m-[5px] flex flex-col max-md:flex-row justify-evenly items-center rounded-2xl'>
              {navigationOptions.map((item, index)=>(
                <div
                  key={index} 
                  className='cursor-pointer' 
                  onClick={()=>handleMenu(item)}
                >
                  {item === 'Orders' ? (
                    <FaShoppingCart className='h-[25px] w-[25px]' />
                  ) : item === 'Products' ? (
                    <FaBox className='h-[25px] w-[25px]' />
                  ) : (
                    <FaPlusCircle className='h-[25px] w-[25px]' />
                  )}
                </div>
              ))}
            </div>
            {menuType === 'Orders' ? (
              <div className='h-full w-full flex flex-col justify-start items-center overflow-y-scroll'>
                {orders.map((order)=>(
                  <OrderCard 
                    key={order.id}
                    order={order}
                  />
                ))}
            </div> 
            ) : menuType === 'Products' ? (
              <div className='h-full w-full max-md:w-full flex flex-col justify-start items-center overflow-y-scroll'>
              {productsData.map((product)=>(
                  <ProductCardAdmin
                    product={product}
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    status={product.status}
                    image={product.img}
                  />
                ))}
                <button className='cursor-pointer w-full bg-[#288e64] cursor- text-[#fff] font-sans font-semibold' onClick={fetchData}>Refresh</button>
              </div>
            ) : menuType === 'New' ? (
              <div className='h-full w-full max-md:w-full flex justify-center items-center'>
                <form onSubmit={handleSubmitNewRow} className="w-[50%] max-md:h-fit max-md:w-[80%] m-5 p-4 bg-white rounded shadow-md">
                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                          Nombre
                      </label>
                      <input
                          id="name"
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Ingresa nombre del producto"
                          required
                      />
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                          Precio
                      </label>
                      <input
                          id="price"
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Ingresa el precio"
                          required
                      />
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                          Descripción
                      </label>
                      <textarea
                          id="description"
                          type='text'
                          onChange={(e) => setDescription(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Ingresa la descripción"
                          required
                      ></textarea>
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                          Estado
                      </label>
                      <select
                          id="status"
                          type='text'
                          onChange={(e) => setStatus(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      >
                          <option value="active">popular</option>
                          <option value="inactive">normal</option>
                      </select>
                  </div>

                  <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                          Imagen
                      </label>
                      <input
                          id="image"
                          type="text"
                          onChange={(e) => setImg(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          required
                      />
                  </div>

                  <div>
                      <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                          Enviar
                      </button>
                  </div>
                </form>
              </div>
            ) : ''}
          </>
        ) : (
          <form className='bg-[#fff] h-fit w-[200px] flex flex-col' onSubmit={signInUser}>
            <input
              type='email'
              placeholder='Email'
              className='m-2 border'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='m-2 border'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='text-red-500'>{error}</p>}
            <button type='submit' className='mt-2 bg-blue-500 text-white cursor-pointer m-2'>Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

