import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import Logo from '../assets/images/logo.svg';
import Cart from '../assets/images/carrinho.svg';
import Loading from "../components/Loading";

class Main extends Component {
  state = {
    productsList: [],
    categories: [],
    search: '',
    searchValidation: true,
    cartItems: [],
    loading: true,
  };

  async componentDidMount() {
    const data = await getCategories();
    this.setState({ categories: data });
    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (localCartItems !== null) {
      this.setState({ cartItems: localCartItems });
    }
    this.getProduct('MLB1648');
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  getProduct = async (id) => {
    const { search } = this.state;
    let data = '';
    if (id) {
      this.setState({loading: true})
      data = await getProductsFromCategoryAndQuery(id, null);
      this.setState({ productsList: data.results, loading: false });
      
    }
    if (search) {
      this.setState({loading: true})
      data = await getProductsFromCategoryAndQuery(null, search);
      this.setState({ productsList: data.results, search: '', loading: false });
    }

    if (!data.length) {
      this.setState({ searchValidation: false });
    } else {
      this.setState({ searchValidation: true });
    }
  };

  saveToLocalStorage = () => {
    const { cartItems } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  addToCart = ({
    id,
    title,
    price,
    thumbnail,
    shipping,
    available_quantity: stock,
  }) => {
    const { cartItems } = this.state;
    const cartItemsCopy = cartItems;
    let item;
    if (cartItems) {
      item = cartItemsCopy.find((product) => product.id === id);
    }

    if (!item) {
      cartItemsCopy.push({
        id,
        title,
        price,
        thumbnail,
        quantity: 1,
        shipping,
        stock,
      });
    } else {
      item.quantity += 1;
    }

    const newCartItems = cartItemsCopy;
    this.setState({ cartItems: [...newCartItems] }, () => {
      this.saveToLocalStorage();
    });
  };

  render() {
    const { productsList, categories, search, searchValidation, cartItems, loading } =
      this.state;
    const getQuantityProductInCard = () => {
      let quantityCart = 0;
      cartItems.forEach((item) => {
        quantityCart += item.quantity;
      });
      return quantityCart;
    };
    return (
      <div>
        <header className='header'>
          <div className='header-container'>
            <form onSubmit={(e) => e.preventDefault()} className="form">
              <label htmlFor='search'>
                <input
                  type='text'
                  data-testid='query-input'
                  onChange={this.handleChange}
                  value={search}
                  className="input"
                  placeholder="Nome do produto"
                />
              </label>
              <button
                type='button'
                data-testid='query-button'
                onClick={this.getProduct}
              >
                Pesquisar
              </button>
            </form>

            <div className='logo'>
              <img src={Logo} alt='Logo FLDEV online store' height={60} />
            </div>

            <Link to='/shopping-cart'>
              <button
                className='cart-button'
                data-testid='shopping-cart-button'
                type='button'
              >
                <img src={Cart} alt='Icon cart size' width={50} />
              </button>
              <span
                className='shopping-cart-size'
                data-testid='shopping-cart-size'
              >
                {getQuantityProductInCard()}
              </span>
            </Link>
          </div>
        </header>
        <div className="container-content">
        <div className='container-categories'>
            <h2>Categorias</h2>
            {categories.map((category) => (
              <button
                type='button'
                key={category.id}
                data-testid='category'
                onClick={() => this.getProduct(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="container-product">
            {loading
              ? <Loading /> : productsList.map((product) => (
                  <div key={product.id} className="card-product">
                    <ProductCard
                      name={product.title}
                      price={product.price}
                      image={product.thumbnail}
                      shipping={product.shipping}
                      id={product.id}
                    />
                    <button
                      type='button'
                      data-testid='product-add-to-cart'
                      onClick={() => this.addToCart(product)}
                      className="button-add-cart"
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                ))}
          </div>

          {!searchValidation && productsList.length <= 0 ? (
            <p>Nenhum produto foi encontrado</p>
          ) : null}

          {/* {searchValidation && (
            <span data-testid='home-initial-message'>
              Digite algum termo de pesquisa ou escolha uma categoria.
            </span>
          )} */}
          
        </div>
      </div>
    );
  }
}

export default Main;
