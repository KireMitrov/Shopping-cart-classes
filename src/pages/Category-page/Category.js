import React from "react";
import ProductCard from "../../components/Product card/ProductCard";
import AppContext from "../../context/AppContext";
import { Query } from "@apollo/client/react/components"
import { PRODUCTS_QUERY } from "../../queries/queries";
import "./Category.css"

class Category extends React.Component {

    static contextType = AppContext;

    render() {

        const { categoryName } = this.context

        return (
            <div>
                <div className="title-position" >
                    <h1 className="title">{categoryName}</h1>
                </div>
                <Query query={PRODUCTS_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) return console.log(error);
                        if (data.categories === undefined) return null;

                        return <div>
                            {data.categories.map((category) => {
                                if (category.name.toLowerCase() === categoryName.toLowerCase())
                                    return <div className="products">
                                        {category.products.map((product, index) => (
                                            <div className="product-card" key={product.name}>
                                                <ProductCard product={product}></ProductCard>
                                            </div>
                                        ))}
                                    </div>
                            })}
                        </div>
                    }}
                </Query>
            </div>
        );
    }
}

export default Category