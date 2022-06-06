import React, { useContext } from 'react'
import { CartContext } from '../../context/cartContext'

const CartPage = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div className='cart'>
      {cartItems.map(pizza => (
        <div key={pizza.id}>
          <h2>{pizza.name} <button> &#x2718;</button></h2>
          <p>Цена: {pizza.price}</p>
        </div>
      ))}
    </div>
  )
}

export default CartPage