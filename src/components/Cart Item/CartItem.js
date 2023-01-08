import React from "react";
import AppContext from "../../context/AppContext";
import "./CartItem.css";

class CartItem extends React.Component {
    static contextType = AppContext;

    render() {
        const { cartItems, currency, currencyToAmount, handleTextAttributeChange, handleIncrement, handleDecrement, removeFromCart } = this.context;
        console.log(cartItems)
        return (
            <div className="cart-products-container">
                helo from CRT
                {cartItems.map((item, index) => (
                    <div className="cart-overlay-item-container" key={index}>
                        <div className="cart-overlay-items-left">
                            <div className="items-left">
                                <div>
                                    <div className="cart-overlay-text">{item.brand}</div>
                                    <div className="cart-overlay-text">{item.name}</div>
                                    <div className="cart-overlay-product-price" >{currency} {item.prices[currencyToAmount(currency)].amount.toFixed(2)}</div>
                                </div>
                                <div>
                                    {item.attributes.map((attribute, index) => {
                                        if (attribute.type === 'text')
                                            return <div key={index}>
                                                <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                                <div className="attributes-container">
                                                    {attribute.items.map((value) => (
                                                        <div
                                                            className={`cart-overlay-attributes-rectangle ${item.addedAttributes[index].defaultValue === value.value ? "atributes-selected" : ""}`}
                                                            key={value.value}
                                                            onClick={() => handleTextAttributeChange(item, attribute.name, value.value)}>{value.value}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        return <div key={index}>
                                            <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                            <div className="attributes-container">
                                                {attribute.items.map((value) => (
                                                    <div className={`cart-overlay-attributes-rectangle-color ${item.addedAttributes[index].defaultValue === value.value ? "cart-overlay-color-selected" : ""}`}
                                                        style={{ backgroundColor: `${value.value}` }}
                                                        key={value.value}
                                                        onClick={() => handleTextAttributeChange(item, attribute.name, value.value)}></div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    )}
                                </div>
                            </div>
                            <div className="cart-overlay-items-right">
                                <div className="incrementDecrement" onClick={() => handleIncrement(item)}>+</div>
                                <div className="cart-overlay-item-quantity">{item.quantity}</div>
                                <div className="incrementDecrement" onClick={() => handleDecrement(item)}>-</div>
                            </div>
                        </div>
                        <div className="cart-overlay-remove-btn" onClick={() => removeFromCart(item)}>x</div>
                        <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                    </div>
                ))}
            </div>
        )
    }
}

export default CartItem