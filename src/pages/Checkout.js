import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends Component {
  state = {
    cartItems: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    cep: '',
    payment: '',
    validateInputBoolean: false,
  };

  componentDidMount() {
    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cartItems: localCartItems });
  }

  saveToLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateInput = () => {
    const { name, email, cep, cpf, phone, address, payment } = this.state;
    const { history } = this.props;
    const isNotValidate =
      email.length > 0 &&
      name.length > 0 &&
      cep.length > 0 &&
      cpf.length > 0 &&
      phone.length > 0 &&
      address.length > 0 &&
      payment.length > 0;
    if (!isNotValidate) {
      this.setState({ validateInputBoolean: true });
    } else {
      this.setState({ validateInputBoolean: false }, () => {
        localStorage.clear();
        history.push('/');
      });
    }
  };

  removeProduct = ({ id }) => {
    const { cartItems } = this.state;
    const cartItemsCopy = cartItems;
    const items = cartItemsCopy.filter((product) => product.id !== id);
    const newCartItems = items;

    if (newCartItems.length <= 0) {
      localStorage.clear();
      this.setState({ cartItems: null });
    } else {
      this.setState({ cartItems: [...newCartItems] }, () => {
        this.saveToLocalStorage();
        let totalPrice = 0;

        cartItems.forEach(({ price, quantity }) => {
          totalPrice += price * quantity;
        });
        this.setState({ priceTotal: totalPrice });
      });
    }
  };

  render() {
    const {
      cartItems,
      name,
      email,
      cep,
      cpf,
      phone,
      address,
      validateInputBoolean,
    } = this.state;
    return (
      <div className='container-checkout'>
        <div className='container-products'>
          <h1>Revise seus Produtos</h1>
          <div className="container-cards">
            {cartItems
              ? cartItems.map((item) => (
                  <div key={item.id} className='card-product-checkout'>
                    <button
                        type='button'
                        data-testid='remove-product'
                        className='button-remove'
                        onClick={() => this.removeProduct(item)}
                      >
                        Remover
                      </button>
                    <img src={item.thumbnail} alt='' />
                    <div className="card-paragraph">
                      <p className="card-title">{item.title}</p>
                      <p className="price">R$ {item.price}</p>
                    </div>
                  </div>
                ))
              : <p data-testid='shopping-cart-empty-message' className='empty'>Seu carrinho está vazio</p>}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="form-checkout">
            <h1>Informações do comprador</h1>
          <div className="form-dados">
            <label htmlFor='name'>
              <span>Nome completo</span>
              <input
                type='text'
                data-testid='checkout-fullname'
                placeholder='Nome completo'
                name='name'
                value={name}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor='email'>
              <span>Email</span>
              <input
                type='email'
                data-testid='checkout-email'
                placeholder='Informe seu email'
                name='email'
                value={email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-dados">
            <label htmlFor='cpf'>
              <span>Cpf</span>
              <input
                type='text'
                name='cpf'
                onChange={this.handleChange}
                value={cpf}
                placeholder='Informe seu CPF'
                data-testid='checkout-cpf'
              />
            </label>
            <label htmlFor='phone'>
              <span>Telefone</span>
              <input
                type='text'
                data-testid='checkout-phone'
                onChange={this.handleChange}
                placeholder='Telefone'
                value={phone}
                name='phone'
              />
            </label>
          </div>

          <div className="form-dados">
            <label htmlFor='cep'>
              <span>Cep</span>
              <input
                type='text'
                data-testid='checkout-cep'
                onChange={this.handleChange}
                placeholder='cep'
                value={cep}
                name='cep'
                className="cep"
              />
            </label>
            <label htmlFor='address'>
              <span>Endereço</span>
              <input
                type='text'
                data-testid='checkout-address'
                onChange={this.handleChange}
                placeholder='address'
                value={address}
                name='address'
              />
            </label>
          </div>

          <div className="method-pay">
            <h2>Métodos de pagamentos</h2>
            <div className="container-pay">
              <label htmlFor='ticket'>
                Boleto
                <input
                  type='radio'
                  name='payment'
                  id='ticket'
                  data-testid='ticket-payment'
                  onChange={this.handleChange}
                  value='boleto'
                />
              </label>
              <label htmlFor='visa'>
                Visa
                <input
                  type='radio'
                  name='payment'
                  id='payment'
                  onChange={this.handleChange}
                  value='visa'
                  data-testid='visa-payment'
                />
                <label htmlFor='master'>
                  MasterCard
                  <input
                    type='radio'
                    name='payment'
                    id='payment'
                    onChange={this.handleChange}
                    value='mastercard'
                    data-testid='master-payment'
                  />
                </label>
              </label>
              <label htmlFor='elo'>
                Elo
                <input
                  type='radio'
                  name='payment'
                  id='payment'
                  onChange={this.handleChange}
                  value='elo'
                  data-testid='elo-payment'
                />
              </label>
            </div>
          </div>
          <button
            type='button'
            data-testid='checkout-btn'
            onClick={this.validateInput}
            className="checkout-button"
          >
            Finalizar Compra
          </button>
        </form>
        {validateInputBoolean && (
          <span data-testid='error-msg'>Campos inválidos</span>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
}.isRequired;
