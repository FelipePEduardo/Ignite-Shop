import logoImg from '../../assets/logo.svg'
import { CardsWrapperContainer, CloseButton, Content, FooterContainer, HandBagContainer, HeaderContainer, ImageContainer, ProductCard, ShoppingBagContainer } from "../Header/styles";
import { Handbag, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

import Image from "next/image";
import { useContext, useState } from 'react';
import { ProductsListContext } from '../../contexts/ProductsListContext';
import axios from 'axios';

export function Header() {
  const { productsList, handleDeleteProduct } = useContext(ProductsListContext)
  const cartQuantity = productsList.length

  const cartTotal = productsList.reduce((totalItems, product) => {
    return totalItems + product.priceNumber
  }, 0)

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  console.log(productsList) /* TIRAR DEPOIS */
  
  async function handleBuyProduct() {
    
    try {
      setIsCreatingCheckoutSession(true)
      
      const response = await axios.post('/api/checkout', {
        products: productsList
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

    } catch (err) {
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      
      setIsCreatingCheckoutSession(false)
      
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <Dialog.Root>
        <HandBagContainer>
          <Handbag size={32} weight='bold'/>
          <span>{productsList.length}</span>
        </HandBagContainer>

        <Dialog.Portal>
          <ShoppingBagContainer>
          <Content>

            <CloseButton>
              <X size={24} weight="bold"/>
            </CloseButton> 

            <div>

              <Dialog.Title>Sacola de compras</Dialog.Title>

              <CardsWrapperContainer>
                {
                  cartQuantity <= 0 && <p>Seu carrinho está vazio</p> 
                }

                { productsList.map( product => (
                  <ProductCard key={product.id}>
                      <ImageContainer>
                        <Image src={product.imageUrl} alt="" width={190} height={93}/>
                      </ImageContainer>
                      <div>
                        <p>{product.name}</p>
                        <strong>{product.price}</strong>
                        <button                         
                          onClick={() => handleDeleteProduct(product.id)}>Remover</button>
                      </div>
                  </ProductCard>
                ))}

              </CardsWrapperContainer>
            </div> 

            <FooterContainer>
                <div>
                  <div>
                    <span>Quantidade</span>
                    <span>{cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'}</span>
                  </div>
                  <div>
                    <span>Valor total</span>
                    <span>{formattedCartTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBuyProduct} 
                  disabled={isCreatingCheckoutSession || cartQuantity < 1}
                >
                  Finalizar compra
                </button>
              </FooterContainer>
          </Content>
            
          </ShoppingBagContainer>
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  )
}