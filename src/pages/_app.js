import { SessionProvider } from "next-auth/react"
import BasketProvider from "../store/context/BasketProvider"
import '../styles/globals.css'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress';
import { Toaster } from "react-hot-toast";

const progress = new ProgressBar({
  size: 3,
  color: "#FBBF24",
  className: "z-index",
  delay: 100
})

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

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
        <Toaster />
      </BasketProvider>
    </SessionProvider>
  )
}

export default MyApp
