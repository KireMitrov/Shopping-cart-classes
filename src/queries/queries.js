import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
{
  categories{
    name
  }
}`


export const CURRENCY_QUERY = gql`
{
    currencies{
      symbol
      label
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
    query category($categoryname:String!){
      category(input:{title:$categoryname}){
        products{
          id
          name
          inStock
          gallery
          description
          brand
          attributes{
            name
            type
            items{
              value
            }
          }
          prices{
            currency{
              label
              symbol
            }
            amount
          }
        }
      }
    }
`;

export const PRODUCT_BY_ID = gql`
  query product($productid:String!){
    product(id:$productid){
      id
      name
      inStock
      gallery
      description
      brand
        attributes{
            name
            type
            items{
              value
            }
        }
        prices{
            currency{
              label
              symbol
            }
            amount
          }
        
      }
}`