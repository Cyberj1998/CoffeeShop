import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Store from './pages/Store'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'
//--------------- React Roter Dom -----------------
import { BrowserRouter , Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <Home />
            <Store />
            <AboutUs />
            <Contact />
            <Footer />
          </>
        } />
        <Route path='/cart' element={
          <>
            <Header />
            <Cart />
          </>
        } />
        <Route path='/admin' element={
          <AdminPanel />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
