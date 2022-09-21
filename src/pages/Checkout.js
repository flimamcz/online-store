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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateInput = () => {
    const { name, email, cep, cpf, phone, address, payment } = this.state;
    const { history } = this.props;
    const isNotValidate = (email.length > 0)
    && (name.length > 0)
    && (cep.length > 0)
    && (cpf.length > 0)
    && (phone.length > 0)
    && (address.length > 0)
    && (payment.length > 0);
    if (!isNotValidate) {
      this.setState({ validateInputBoolean: true });
    } else {
      this.setState({ validateInputBoolean: false }, () => {
        localStorage.clear();
        history.push('/');
      });
    }
  };

  render() {
    const { cartItems, name, email, cep, cpf,
      phone,
      address,
      validateInputBoolean,
    } = this.state;
    return (
      <div>
        {cartItems ? cartItems.map((item) => (
          <div key={ item.id }>
            <p>{item.title}</p>
          </div>
        )) : null}

        <form onSubmit={ (e) => e.preventDefault() }>
          <label htmlFor="name">
            Nome completo
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome completo"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              data-testid="checkout-email"
              placeholder="Informe seu email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="cpf">
            Cpf
            <input
              type="text"
              name="cpf"
              onChange={ this.handleChange }
              value={ cpf }
              placeholder="Informe seu CPF"
              data-testid="checkout-cpf"
            />
          </label>

          <label htmlFor="phone">
            Telefone
            <input
              type="text"
              data-testid="checkout-phone"
              onChange={ this.handleChange }
              placeholder="Telefone"
              value={ phone }
              name="phone"
            />
          </label>

          <label htmlFor="cep">
            Cep
            <input
              type="text"
              data-testid="checkout-cep"
              onChange={ this.handleChange }
              placeholder="cep"
              value={ cep }
              name="cep"
            />
          </label>

          <label htmlFor="address">
            Endereço
            <input
              type="text"
              data-testid="checkout-address"
              onChange={ this.handleChange }
              placeholder="address"
              value={ address }
              name="address"
            />
          </label>

          <label htmlFor="ticket">
            Boleto
            <input
              type="radio"
              name="payment"
              id="ticket"
              data-testid="ticket-payment"
              onChange={ this.handleChange }
              value="boleto"
            />
          </label>

          <label htmlFor="visa">
            Visa
            <input
              type="radio"
              name="payment"
              id="payment"
              onChange={ this.handleChange }
              value="visa"
              data-testid="visa-payment"
            />

            <label htmlFor="master">
              MasterCard
              <input
                type="radio"
                name="payment"
                id="payment"
                onChange={ this.handleChange }
                value="mastercard"
                data-testid="master-payment"
              />
            </label>
          </label>

          <label htmlFor="elo">
            Elo
            <input
              type="radio"
              name="payment"
              id="payment"
              onChange={ this.handleChange }
              value="elo"
              data-testid="elo-payment"
            />
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.validateInput }
          >
            Finalizar Compra
          </button>
        </form>
        {validateInputBoolean && <span data-testid="error-msg">Campos inválidos</span>}
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object,
}.isRequired;
