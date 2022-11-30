import React from "react"
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { PRODUCTS_QUERY, CURRENCY_QUERY } from "../../queries/queries";
import { Query } from "@apollo/client/react/components";
import CartOverlay from "../Cart Overlay/CartOverlay";


class Navbar extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            currencyIsOpen: false,
        };
    }


    render() {
        const { categoryName, setCategoryName, cartIsOpen, setCartIsOpen, currency, setCurrency, cartItems, totalItems } = this.context

        return <div className="header">
            {cartIsOpen && (
                <div style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: `rgba(0,0,0,0.4)`,
                    zIndex: 10,
                }} onClick={() => setCartIsOpen(!cartIsOpen)}>
                </div>
            )}

            <img className="logo" src="a-logo.svg" alt="logo"></img>

            <Query query={PRODUCTS_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.categories === undefined) return null;

                    return (<div className="navigation">
                        {data.categories.map((category) => (
                            <Link to={category.name} key={category.name} onClick={() => setCategoryName(category.name)}>
                                <div className={`navigation-element ${category.name === categoryName ? "tab-active" : ""}`}>
                                    <p className={`label ${category.name === categoryName ? "label-active" : ""}`}>{category.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                    )
                }
                }
            </Query>
            <div className="actions">
                <div className="currency" onClick={() => this.setState({ currencyIsOpen: !(this.state.currencyIsOpen) })}>
                    <div className="currency-sign">{currency}</div>
                    <img src={this.state.currencyIsOpen ? 'VectorUp.svg' : "Vector.svg"} alt="arrowUpDown" />
                </div>
                <div className="cart-items-notification" style={{ display: totalItems === 0 ? "none" : "block" }}>{totalItems}</div>
                <img className="cart-icon" src="Empty Cart.svg" alt="empty-cart" onClick={() => setCartIsOpen(!cartIsOpen)} />
            </div>
            <div style={{ display: !cartIsOpen ? "none" : "block" }}>
                <CartOverlay></CartOverlay>
            </div>
            <Query query={CURRENCY_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.currencies === undefined) return null;

                    return (
                        <div className="currencySelector" style={{ display: !this.state.currencyIsOpen ? "none" : "block" }} onClick={() => this.setState({ currencyIsOpen: !(this.state.currencyIsOpen) })}>
                            {data.currencies.map((currency) => (
                                <div onClick={() => setCurrency(currency.symbol)} className="currencyDiv" key={currency.symbol}>
                                    <div>{currency.symbol}</div>
                                    <div>{currency.label}</div>
                                </div>
                            ))}
                        </div>
                    )
                }
                }
            </Query>
        </div>
    }
}

export default Navbar