import React, { useState } from "react";

import SignOut from '../components/SignOut';
import { Heading } from '@chakra-ui/react';
import { auth } from '../firebase/firebase'
import CartModal from "../components/CartModal";
import CDList from "../components/CDList";
import CartButton from "../components/CartButton";
import "../styles.css";


const Home = () => {

    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const addToCart = (cd) => {
      setCart([...cart, cd]);
    };
  
    const removeFromCart = (indexToRemove) => {
      setCart(cart.filter((_, index) => index !== indexToRemove));
    };
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <div>
    <Heading>
        <div className="container">
            <SignOut className="left"/>
            <h2 className="right">{auth.currentUser.email}</h2>
        </div>
    </Heading>

    <h1>Aplicație cumpărare CD-uri</h1>
      <CartButton openModal={openModal} />
      <CDList addToCart={addToCart} />
      <CartModal
        cartItems={cart}
        isOpen={isModalOpen}
        closeModal={closeModal}
        removeFromCart={removeFromCart}
      />
</div>
  );
};

export default Home;
