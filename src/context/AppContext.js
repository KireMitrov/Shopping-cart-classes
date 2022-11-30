import React from "react";

const AppContext = React.createContext();

class AppProvider extends React.Component {

    state = {
        categoryName: "all",
        cartIsOpen: false,
        currency: "$",
        product: "",
        cartItems: [],
        imageUrl: "",
        totalItems: 0,
        totalPrice: 0,

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

    setProduct = (product) => {
        this.setState({ product: product })
    }

    setImageUrl = (url) => {
        this.setState({ imageUrl: url })
    }


    addToCart = (product) => {

        const addedItem = this.state.cartItems.find((item) => item.name === product.name && item.quantity === product.quantity && JSON.stringify(item.addedAttributes) === JSON.stringify(product.addedAttributes));


        if (addedItem) {
            this.setState({ cartItems: [...this.state.cartItems] });
            return
        }

        this.setState({ cartItems: [...this.state.cartItems, product] })
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

    handleTextAttributeChange = (value, name, attribute) => {
        let changedItem = this.state.cartItems.find((item) => item.name === name);
        if (changedItem) {
            let attributeToChange = changedItem.addedAttributes.findIndex((att) => att.name === attribute);
            changedItem.addedAttributes[attributeToChange]["defaultValue"] = value;
            this.setState({ cartItems: this.state.cartItems });
        } else {
            console.log('hi')
        }
    }


    currencyToAmount = (currency) => {
        switch (currency) {
            case "$":
                return 0;
            case "£":
                return 1;
            case "A$":
                return 2;
            case "¥":
                return 3;
            case "₽":
                return 4;
        }
    }

    // Calculating total amount to pay


    calculateTotal = () => {
        let price = 0;
        this.state.cartItems.forEach((item, index) => {
            price += item.quantity * item.prices[this.currencyToAmount(this.state.currency)].amount
        })
        return price.toFixed(2);
    }


    render() {
        const { children } = this.props
        const { categoryName, cartIsOpen, currency, product, imageUrl, cartItems, totalItems, totalPrice } = this.state
        const { setCategoryName, setCartIsOpen, setCurrency, setProduct, currencyToAmount, addToCart, removeFromCart, handleDecrement, handleIncrement, handleTextAttributeChange, setImageUrl, calculateTotal } = this

        return (
            <AppContext.Provider value={{
                categoryName,
                setCategoryName,
                cartIsOpen,
                setCartIsOpen,
                currency,
                setCurrency,
                product,
                setProduct,
                currencyToAmount,
                addToCart,
                removeFromCart,
                handleDecrement,
                handleIncrement,
                handleTextAttributeChange,
                setImageUrl,
                imageUrl,
                cartItems,
                totalItems,
                totalPrice, 
                calculateTotal
            }}>{children}</AppContext.Provider>
        )
    }
}

export default AppContext

export { AppProvider }