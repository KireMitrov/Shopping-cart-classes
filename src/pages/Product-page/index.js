import React from "react";
import AppContext from "../../context/AppContext";
import "./ProductPage.css"
import parse from 'html-react-parser';
import { PRODUCT_BY_ID } from "../../queries/queries";
import { Query } from "@apollo/client/react/components";


class ProductPage extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            itemId: window.location.pathname.split('/')[2],
            product: null,
        }

        this.changeAttribute = this.changeAttribute.bind(this)
    }


    changeAttribute(product, attribute, value ) {
        let attributeToChange = product.addedAttributes.findIndex((att) => att.name === attribute);
        product.addedAttributes[attributeToChange]["defaultValue"] = value;
        this.setState({product: product})
    }


    render() {

        const { currency, currencyToAmount, addToCart } = this.context;


        return (
            
            <Query query={PRODUCT_BY_ID} variables={{ productid: this.state.itemId }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data === undefined) return null;
                    if (data) {
                        const attributesArray = data.product.attributes.map((item) => ({ name: item.name, defaultValue: item.items[0].value }));
                        const product = this.state.product ? this.state.product : { ...data.product, addedAttributes: attributesArray, quantity: 1 };


                        return (
                            <div className="product-container">
                                <div className="product">
                                    <img src={this.state.imageUrl === "" ? product.gallery[0] : this.state.imageUrl} alt={product.name}></img>
                                </div>
                                <div className="product-description">
                                    <div className="product-brand">{product.brand}</div>
                                    <p className="product-title">{product.name}</p>
                                    <div>
                                        {product.attributes.map((attribute, index) => {
                                            if (attribute.type === 'text')
                                                return <div key={index}>
                                                    <p className="attributes-text">{attribute.name}:</p>
                                                    <div className="attributes-container">
                                                        {attribute.items.map((value) => (
                                                            <div className={`attributes-rectangle ${product.addedAttributes[index].defaultValue === value.value ? "atributes-selected" : ""}`}
                                                                key={value.value}
                                                                onClick={() => this.changeAttribute(product, attribute.name, value.value)}
                                                            >{value.value}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            return <div key={index}>
                                                <p className="attributes-text">{attribute.name}:</p>
                                                <div className="attributes-container">
                                                    {attribute.items.map((value) => (
                                                        <div className={`attributes-rectangle-color ${product.addedAttributes[index].defaultValue === value.value ? "cart-attributes-color-selected" : ""}`}
                                                            style={{ backgroundColor: `${value.value}` }}
                                                            key={value.value}
                                                            onClick={() => this.changeAttribute(product, attribute.name, value.value )}>
                                                        </div>))}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div>
                                        <div className="attributes-text">PRICE:</div>
                                        <div className="product-description-price">{currency}{product.prices[currencyToAmount(currency)].amount}</div>
                                    </div>
                                    <button onClick={() => addToCart(product)} disabled={!product.inStock}>ADD TO CART</button>
                                    <div className="product-description-text">{parse(`${product.description}`)}</div>
                                </div>
                                <div className="product-images">
                                    {product.gallery.map((url, index) => (
                                        <img src={url} onClick={() => { this.setState({ imageUrl: url }) }} key={index} alt={url}></img>))}
                                </div>
                            </div>
                        )
                    }
                }
                }
            </Query >
        )
    }
}

export default ProductPage