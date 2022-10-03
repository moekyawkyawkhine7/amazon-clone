import { SessionProvider } from "next-auth/react"
import BasketProvider from "../store/context/BasketProvider"
import '../styles/globals.css'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress';
import { Toaster } from "react-hot-toast";
import HomeItemsProvider from "../store/context/HomeItemsProvider";

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
      <HomeItemsProvider>
        <BasketProvider>
          <Component {...pageProps} />
          <Toaster />
        </BasketProvider>
      </HomeItemsProvider>
    </SessionProvider>
  )
}

export default MyApp
