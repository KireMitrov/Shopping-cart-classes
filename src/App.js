import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Navigate } from "react-router";
import Cart from './pages/Cart';
import Category from './pages/Category-page/Category';
import ProductPage from './pages/Product-page';
import React from 'react';




class App extends React.Component {

  render() {

    return (
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path=":categoryName" element={<Category></Category>}></Route>
          <Route path="/" element={<Category></Category>}></Route>
          <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
        </Routes>
      </div>
    );
  }


}

export default App;
