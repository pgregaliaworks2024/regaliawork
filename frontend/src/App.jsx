import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Verify from './pages/Verify';
import Career from './pages/Career';
import Policy from './pages/Policy';
import NotFound from './pages/NotFound';
import ReturnPolicy from './pages/ReturnPolicy';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <TitleUpdater /> {/* Add the TitleUpdater component here */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/career' element={<Career />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/returnpolicy' element={<ReturnPolicy />} />
        <Route path='*' element={<NotFound />} />  {/* Catch-all route for 404 */}
      </Routes>
      <Footer />
    </div>
  );
};

// TitleUpdater Component to handle document title changes
const TitleUpdater = () => {
  const location = useLocation();

  React.useEffect(() => {
    const titles = {
      '/': 'Regalia Store',
      '/collection': 'Wardrobe - Regalia Store',
      '/about': 'About Us - Regalia Store',
      '/career': 'Career Opportunities - Regalia Store',
      '/cart': 'Cart - Regalia Store',
      '/login': 'Login - Regalia Store',
      '/place-order': 'Place Your Order - Regalia Store',
      '/orders': 'Your Orders - Regalia Store',
      '/verify': 'Verify Your Account - Regalia Store',
      '/policy': 'Policy - Regalia Store',
    };

    document.title = titles[location.pathname] || 'Regalia Store | IN'; // Set default title if path not found
  }, [location]);

  return null; // This component does not need to render anything
};

export default App;
