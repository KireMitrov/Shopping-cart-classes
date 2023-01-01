import React from "react";
import ProductCard from "../../components/Product card/ProductCard";
import AppContext from "../../context/AppContext";
import { Query } from "@apollo/client/react/components"
import { PRODUCTS_BY_CATEGORY } from "../../queries/queries";
import "./Category.css"

class Category extends React.Component {

    static contextType = AppContext;

    render() {

        const { categoryName, cartIsOpen, setCartIsOpen } = this.context

        return (
            <div className={cartIsOpen ? "openCartOverlay" : ""} onClick={() => setCartIsOpen(false)}>
                <div className="title-position" >
                    <h1 className="title">{categoryName}</h1>
                </div>
                <Query query={PRODUCTS_BY_CATEGORY} variables={{ categoryname: categoryName }}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);
                        if (data === undefined) return null;

                        return (<div className="products">
                            {data.category.products.map((product, index) => (
                                <div className="product-card" key={index}>
                                    <ProductCard product={product}></ProductCard>
                                </div>
                            ))}
                        </div>)
                    }}
                </Query>
            </div>
        );
    }
}

export default Category