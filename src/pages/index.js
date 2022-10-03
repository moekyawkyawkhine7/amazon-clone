import { getSession } from "next-auth/react";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// comp
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import { SET_ALL_ITEMS } from "../store/actionTypes";
import { HomeItemsContext } from "../store/context/HomeItemsProvider";

export default function Home({
  productsData = []
}) {

  let [{ items }, dispatch] = useContext(HomeItemsContext);

  useEffect(() => {
    if (productsData.length > 0)
      dispatch({
        type: SET_ALL_ITEMS,
        payload: productsData
      })
  }, [productsData])

  return (
    <div id="nav-top">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="breakout-point">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        {items.length > 0 ? <ProductFeed productsData={items} /> : <div className="py-7 flex flex-col items-center bg-white my-2 rounded-md shadow-md mx-1">
          <AiOutlineInbox className='w-24 md:w-32 h-24 md:h-32' />
          <p className="font-semibold text-lg">No Items Found!</p>
        </div>}
      </main>
      <a href="#nav-top" className="text-sm text-gray-200 bg-amazon_blue-light hover:bg-amazon_blue-lighter py-4 flex justify-center cursor-pointer">
        Back to top
      </a>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  let session = await getSession(context);
  let productsApi = await fetch("https://fakestoreapi.com/products");
  let productsData = await productsApi.json();
  return {
    props: {
      productsData,
      session
    }
  }
}