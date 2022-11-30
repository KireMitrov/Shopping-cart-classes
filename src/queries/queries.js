import { gql } from "@apollo/client";


export const PRODUCTS_QUERY = gql`
{
    categories{
      name
      products{
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


export const CURRENCY_QUERY = gql`
{
    currencies{
      symbol
      label
    }
  }
`;
