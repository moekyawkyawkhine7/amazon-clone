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
      <main className="max-w-screen-2xl mx-auto bg-gray-100">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        <ProductFeed productsData={productsData} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  let productsApi = await fetch("https://fakestoreapi.com/products");
  let productsData = await productsApi.json();
  return {
    props: {
      productsData
    }
  }
}