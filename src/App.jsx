

import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './Components/HomePage/Navbar/Navbar';
import Footer from './Components/HomePage/Footer/Footer';

function App() {

  return (
    <>   
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

export default App
