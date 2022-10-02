import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
// comp
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({
  productsData = []
}) {
  return (
    <div>
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
    </div>
  );
}

export async function getServerSideProps(context) {
  let session= await getSession(context);
  let productsApi = await fetch("https://fakestoreapi.com/products");
  let productsData = await productsApi.json();
  return {
    props: {
      productsData,
      session
    }
  }
}