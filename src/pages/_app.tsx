import { AppProps } from "next/app";
import { globalStyles } from "../styles/global";


import {  Container } from "../styles/pages/app";

import { ProductsListProvider } from "../contexts/ProductsListContext";
import { Header } from "../components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsListProvider>
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </ProductsListProvider>
  )
}
