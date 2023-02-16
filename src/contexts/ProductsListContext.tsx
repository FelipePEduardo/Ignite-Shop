import { createContext, ReactNode, useState } from "react";

export interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  priceNumber: number
  defaultPriceId: string
}

interface ProductsListContextType {
  productsList : ProductProps[]
  handleAddProductToCart: (product: ProductProps) => void
  handleDeleteProduct: (productId: string) => void
  checkIfProductAlreadyExistsInProductsList: (productId: string) => boolean
}

interface ProductsListProviderProps {
  children: ReactNode
}

export const ProductsListContext = createContext({} as ProductsListContextType)

export function ProductsListProvider({children}: ProductsListProviderProps) {
  const [productsList, setProductsList] = useState<ProductProps[]>([])

  function handleAddProductToCart(product: ProductProps) {
    setProductsList((state) => [...state, product]) 
  }

  function handleDeleteProduct(productId: string) {
    const productsListWithouthDeletedOne = productsList.filter(product => {
      return product.id !== productId
    })

    setProductsList(productsListWithouthDeletedOne)
  }

  function checkIfProductAlreadyExistsInProductsList(productId: string) {
    return productsList.some((product) => product.id == productId)
  }

  return (
    <ProductsListContext.Provider value={{ productsList, handleAddProductToCart, handleDeleteProduct, checkIfProductAlreadyExistsInProductsList }}>
      {children}
    </ProductsListContext.Provider>
  )
}
