import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from 'next/link'

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"
import { Handbag } from 'phosphor-react'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import React, { useContext } from "react"
import { ProductsListContext } from "../contexts/ProductsListContext"

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  priceNumber: number 
  defaultPriceId: string
}

interface HomeProps {
  products: ProductProps[]
}

export default function Home({ products }: HomeProps) {
  const { handleAddProductToCart , checkIfProductAlreadyExistsInProductsList } = useContext(ProductsListContext)

  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  function addProduct (e:React.SyntheticEvent<EventTarget>, product: ProductProps) {
    e.preventDefault()
    handleAddProductToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {
          products.map(product => {
            return (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`} 
                prefetch={false}
              >
                <Product className="keen-slider__slide" >
                  <Image src={product.imageUrl} alt="" width={520} height={480} />

                  <footer>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>
                    <button
                      disabled={checkIfProductAlreadyExistsInProductsList(product.id)}
                      onClick={(e) => {
                      addProduct(e, product)
                    }}>
                      <Handbag size={32} weight="bold"/>
                    </button>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      priceNumber: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}