import { SessionProvider } from "next-auth/react"
import BasketProvider from "../store/context/BasketProvider"
import '../styles/globals.css'

const MyApp = ({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}) => {
  return (
    <SessionProvider session={session}>
      <BasketProvider>
        <Component {...pageProps} />
      </BasketProvider>
    </SessionProvider>
  )
}

export default MyApp
