import React from "react";
import { Outlet, Link } from 'react-router-dom';
import AppContext from "../../context/AppContext";
import "./ProductCard.css";

class ProductCard extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            isHovered: false,
        }
    }

    render() {

        const { currency, setProduct, addToCart, currencyToAmount } = this.context
        const attributesArray = this.props.product.attributes.map((item) => ({ name: item.name, defaultValue: item.items[0].value }));

        return (
            <div className={`product-card ${this.props.product.inStock ? '' : 'img-out-of-stock'}`}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <Link to={this.props.product.inStock ? this.props.product.name : ''}  onClick={() => setProduct({...this.props.product, addedAttributes: attributesArray, quantity:1})}>
                    {this.props.product.inStock ? null : <div className="out-of-stock-text">OUT OF STOCK</div>}
                    <img src={this.props.product.gallery[0]} className="product-card-img" ></img>
                    <div className="content">
                        {this.props.product.name}
                    </div>
                    <div className="product-price">
                        {currency} {this.props.product.prices[currencyToAmount(currency)].amount.toFixed(2)}
                    </div>
                </Link>
                {this.state.isHovered && this.props.product.inStock ? <img src={'Circle Icon.svg'} className="cart-icon-small"
                onClick={() => addToCart({...this.props.product, quantity:1,  addedAttributes: attributesArray })}
                ></img> : null}
            </div>
        )
    }

}

export default ProductCard