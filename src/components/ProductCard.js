import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  render() {
    const { name, price, image, id, quantity, shipping } = this.props;

    return (
      <div className="product-component" data-testid="product">
        <Link data-testid="product-detail-link" to={ `/product-details/${id}` }>
          <img src={ image } alt={ name } />
          <h2 data-testid="shopping-cart-product-name" className="title-product">{name}</h2>
          <p className="price">R$ {' '}{price}</p>
          { quantity && <p data-testid="shopping-cart-product-quantity" className="quantity">{ quantity }</p> }
        </Link>
        {shipping && shipping.free_shipping && (
          <img src="https://ajuda.simplo7.com.br/hc/article_attachments/7681169045659/225edfb8a33c5a100cce5e21a13fe102.jpg" className="free-shipping" width={70}/>
        ) }
      </div>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  image: PropTypes.string,
  quantity: PropTypes.number,
}.isRequired;
