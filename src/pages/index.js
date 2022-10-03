import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
// comp
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({
  productsData = []
}) {
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
        <ProductFeed productsData={productsData} />
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