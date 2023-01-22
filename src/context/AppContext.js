import React from "react";

const AppContext = React.createContext();

class AppProvider extends React.Component {

    state = {
        categoryName: "all",
        cartIsOpen: false,
        currency: "$",
        cartItems: [],
        totalItems: 0,

    }

    setCategoryName = (category) => {
        this.setState({ categoryName: category });
    }

    setCartIsOpen = (toggle) => {
        this.setState({ cartIsOpen: toggle })
    }

    setCurrency = (symbol) => {
        this.setState({ currency: symbol })
    }


    addToCart = (product) => {

        const addedItem = this.state.cartItems.find((item) => item.name === product.name && item.quantity === product.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(product.addedAttributes));
        const productToAdd = JSON.parse(JSON.stringify({...product}))

        if (addedItem) {
            this.setState({ cartItems: [...this.state.cartItems] });
            return
        }

        this.setState({ cartItems: [...this.state.cartItems, productToAdd] })
        this.setState({ totalItems: this.state.totalItems + 1 })


    }

    removeFromCart = (product) => {

        const leftOverItems = this.state.cartItems.filter((item) => !(product.name === item.name && product.quantity === item.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(product.addedAttributes)));
        this.setState({ cartItems: leftOverItems });
        this.setState({ totalItems: this.state.totalItems - product.quantity })
    }

    // Handling increment-decrement of quantity

    handleIncrement = (product) => {

        let changedQuantityItem = this.state.cartItems.find((item) => item.name === product.name && item.quantity === product.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(product.addedAttributes));

        if (changedQuantityItem) {
            changedQuantityItem.quantity += 1;
            this.setState({ cartItems: this.state.cartItems });
            this.setState({ totalItems: this.state.totalItems + 1 })
        }
    }

    handleDecrement = (product) => {
        let changedQuantityItem = this.state.cartItems.find((item) => item.name === product.name && item.quantity === product.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(product.addedAttributes));

        if (changedQuantityItem && changedQuantityItem.quantity > 1) {
            changedQuantityItem.quantity -= 1;
            this.setState({ cartItems: this.state.cartItems });
            this.setState({ totalItems: this.state.totalItems - 1 })
        }
    }

    // Handling attribute change

    handleTextAttributeChange = (product, attribute, value) => {

            let attributeToChange = product.addedAttributes.findIndex((att) => att.name === attribute);
            product.addedAttributes[attributeToChange]["defaultValue"] = value;
            this.setState({ cartItems: this.state.cartItems });

    }


    currencyToAmount = (currencyObject) => {
        
        let index = currencyObject.findIndex((i) => this.state.currency === i.currency.symbol);
        return index;
        
    }

    // Calculating total amount to pay


    calculateTotal = () => {
        let price = 0;
        this.state.cartItems.forEach((item, index) => {
            price += item.quantity * item.prices[this.currencyToAmount(item.prices)].amount
        })
        return price.toFixed(2);
    }


    render() {
        const { children } = this.props
        const { categoryName, cartIsOpen, currency, cartItems, totalItems, totalPrice } = this.state
        const { setCategoryName, setCartIsOpen, setCurrency, currencyToAmount, addToCart, removeFromCart, handleDecrement, handleIncrement, handleTextAttributeChange, calculateTotal } = this

        return (
            <AppContext.Provider value={{
                categoryName,
                setCategoryName,
                cartIsOpen,
                setCartIsOpen,
                currency,
                setCurrency,
                currencyToAmount,
                addToCart,
                removeFromCart,
                handleDecrement,
                handleIncrement,
                handleTextAttributeChange,
                cartItems,
                totalItems, 
                calculateTotal
            }}>{children}</AppContext.Provider>
        )
    }
}

export default AppContext

export { AppProvider }