import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { useContext } from "react"
import Head from "next/head"
import { ProductsListContext } from "../../contexts/ProductsListContext"

interface ProductProps {
  product : {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    priceNumber: number 
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps) {   
  const { handleAddProductToCart, checkIfProductAlreadyExistsInProductsList } = useContext(ProductsListContext)

  const productAlreadyExists = checkIfProductAlreadyExistsInProductsList(product.id)

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
    
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=''/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button 
            disabled={productAlreadyExists}  
            onClick={() => {
            handleAddProductToCart(product)
          }}>
            {productAlreadyExists ? 'Produto já adicionado' : 'Colocar na sacola'}
            </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NI3Z0EkpDpBYpM' } }
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        priceNumber: price.unit_amount / 100,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}