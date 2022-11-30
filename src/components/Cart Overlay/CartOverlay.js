import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";


class CartOverlay extends React.Component {

    static contextType = AppContext;


    render() {

        const { currency, cartItems, currencyToAmount, handleDecrement, handleTextAttributeChange, handleIncrement, removeFromCart, setCartIsOpen, totalItems, calculateTotal } = this.context
        console.log(calculateTotal())
        return (
            <div className="cart-overlay" >
                <div className="cart-overlay-products-container">
                    <div><b>My Bag,</b> {totalItems} items</div>
                    {cartItems.map((item, index) => (
                        <div className="cart-overlay-item-container" key={index}>
                            <div className="cart-overlay-items-left">
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
                                                        className={`cart-overlay-attributes-rectangle ${ item.addedAttributes[index].defaultValue === value.value ? "atributes-selected" : ""}`} 
                                                        key={value.value} 
                                                        onClick={()=> handleTextAttributeChange(value.value, item.name, attribute.name)}>{value.value}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        return <div key={index}>
                                            <p className="cart-overlay-attributes-text">{attribute.name}:</p>
                                            <div className="attributes-container">
                                                {attribute.items.map((value) => (
                                                    <div className={`cart-overlay-attributes-rectangle-color ${ item.addedAttributes[index].defaultValue === value.value ? "cart-overlay-color-selected" : ""}`} 
                                                    style={{ backgroundColor: `${value.value}` }} 
                                                    key={value.value}
                                                    onClick={()=> handleTextAttributeChange(value.value, item.name, attribute.name)}></div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                    )}
                                </div>
                            </div>
                            <div className="cart-overlay-items-right">
                                <div className="cart-quantity-selector">
                                    <div className="cart-overlay-attributes-rectangle" onClick={() => handleIncrement(item)}>+</div>
                                    <div className="cart-overlay-item-quantity">{item.quantity}</div>
                                    <div className="cart-overlay-attributes-rectangle" onClick={() => handleDecrement(item)}>-</div>
                                </div>
                                <img className="cart-img" src={item.gallery[0]} alt={item.name}></img>
                                <div className="cart-overlay-remove-btn" onClick={()=>removeFromCart(item)}>x</div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-overlay-total">
                        <div className="cart-overlay-total-text">Total</div>
                        <div className="cart-overlay-price">{currency} {calculateTotal()}</div>
                    </div>
                    <div className="cart-overlay-btns">
                        <Link to="cart"><button className="cart-overlay-view-bag" onClick={() => (setCartIsOpen(false))} >VIEW BAG</button></Link>
                        <button className="cart-overlay-check-out">CHECK OUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartOverlay