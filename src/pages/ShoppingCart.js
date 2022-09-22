import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import iconBack from '../assets/images/icon-back.png';
import Header from '../components/Header';

export default class ShoppingCart extends Component {
  state = {
    cartItems: [],
    priceTotal: 0,
    emptyCart: false,
  };

  componentDidMount() {
    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (localCartItems) {
      this.setState({ cartItems: localCartItems });
    }

    if(!localCartItems) {
      this.setState({emptyCart: true})
    }

    if (localCartItems) {
      let totalPrice = 0;
      localCartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      this.setState({ priceTotal: totalPrice });
    }
  }

  saveToLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  increaseQuantity = ({ id, stock }) => {
    const { cartItems } = this.state;
    let totalPrice = 0;

    const cartItemsCopy = cartItems;
    const item = cartItemsCopy.find((product) => product.id === id);
    if (item.quantity < stock) {
      item.quantity += 1;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      this.setState({ priceTotal: totalPrice });
    }
    const newCartItems = cartItemsCopy;
    this.setState({ cartItems: [...newCartItems] }, () => {
      this.saveToLocalStorage();
    });
  };

  decreaseQuantity = ({ id }) => {
    const { cartItems } = this.state;
    const cartItemsCopy = cartItems;
    let totalPrice = 0;
    const item = cartItemsCopy.find((product) => product.id === id);
    if (item.quantity > 1) {
      item.quantity -= 1;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      this.setState({ priceTotal: totalPrice });
    }
    const newCartItems = cartItemsCopy;
    this.setState({ cartItems: [...newCartItems] }, () => {
      this.saveToLocalStorage();
    });
  };

  removeProduct = ({ id }) => {
    const { cartItems } = this.state;
    const cartItemsCopy = cartItems;
    const items = cartItemsCopy.filter((product) => product.id !== id);
    const newCartItems = items;
    if (newCartItems.length <= 0) {
      localStorage.clear();
      this.setState({ cartItems: null }, () => {
        this.setState({ emptyCart: true });
      });
    } else {
      this.setState({ cartItems: [...newCartItems] }, () => {
        this.saveToLocalStorage();
        let totalPrice = 0;
        cartItems.forEach(({ price, quantity }) => {
          totalPrice += price * quantity;
        });
        this.setState({ priceTotal: totalPrice }, () => {
          this.setState({ emptyCart: false });
        });
      });
    }
  };

  render() {
    const { cartItems, priceTotal, emptyCart } = this.state;
    return (
      <div>
        <Header cartItems={cartItems} />
        <div className='content-cart'>
          <div className='container-cart'>
            <div>
              <Link to='/'>
                <img src={iconBack} alt='icon back' width={30} />
                Voltar
              </Link>
              <h1>Carrinho de compras</h1>
              {cartItems
                ? cartItems.map((product) => (
                    <div key={product.id} className='product-cart'>
                      <ProductCard
                        name={product.title}
                        price={product.price}
                        image={product.thumbnail}
                        id={product.id}
                        shipping={product.shipping}
                        quantity={product.quantity}
                      />
                      <div className='container-buttons'>
                        <button
                          type='button'
                          data-testid='product-decrease-quantity'
                          onClick={() => this.decreaseQuantity(product)}
                          className='button-add'
                        >
                          -
                        </button>
                        <button
                          type='button'
                          data-testid='remove-product'
                          className='button-remove'
                          onClick={() => this.removeProduct(product)}
                        >
                          Remover
                        </button>
                        <button
                          type='button'
                          data-testid='product-increase-quantity'
                          className='button-add'
                          onClick={() => this.increaseQuantity(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                : null}
              {emptyCart && (
                <p data-testid='shopping-cart-empty-message' className='empty'>
                  Seu carrinho está vazio
                </p>
              )}
            </div>
          </div>

          <div className='content-cart-checkout'>
            {cartItems && (
              <p className='total-price'>
                Valor total da compra <br /> R$ {priceTotal.toFixed(2)}
              </p>
            )}
            {cartItems ? (
              <Link
                to='/checkout'
                data-testid='checkout-products'
                className='checkout'
              >
                Finalizar Compra
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
