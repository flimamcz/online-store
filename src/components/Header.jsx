import React, { Component } from 'react'
import Logo from '../assets/images/logo.svg'
import Cart from '../assets/images/carrinho.svg';
import { Link } from "react-router-dom"

export default class Header extends Component {
  render() {
    const {cartItems} = this.props;
    const getQuantityProductInCard = () => {
      let quantityCart = 0;
      if(cartItems) {
        cartItems.forEach((item) => {
          quantityCart += item.quantity;
        });
        return quantityCart;
      } else {
        return quantityCart = 0
      }
    };
    return (
      <header className="header-component">
        <div className="header-container">
          <Link to="/">
            <img src={Logo} alt=""Logo Fldev online store />
          </Link>
          <Link to='/shopping-cart'>
                <button
                  className='cart-button'
                  data-testid='shopping-cart-button'
                  type='button'
                >
                  <img src={Cart} alt='Icon cart size' width={50} />
                </button>
                <span
                  className='cart-size'
                  data-testid='shopping-cart-size'
                >
                  {getQuantityProductInCard()}
                </span>
              </Link>
        </div>
      </header>
    )
  }
}
