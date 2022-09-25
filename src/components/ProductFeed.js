import React from 'react'
import Product from './Product'

const ProductSlice = ({ from = 0, to = 0, productsData = [] }) => {
    return (
        <>
            {productsData.slice(from, to).map(({ id, title, price, description, image, category }) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    image={image}
                    category={category}
                />
            ))}
        </>
    )
}

const ProductFeed = ({
    productsData = []
}) => {
    return (
        <div className="md:-mt-52 grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <ProductSlice
                from={0}
                to={3}
                productsData={productsData}
            />
            {/* Ads */}
            <img src="https://links.papareact.com/dyz" className="w-full md:col-span-full" />
            <div className="md:col-span-2">
                <ProductSlice
                    from={3}
                    to={4}
                    productsData={productsData}
                />
            </div>
            <ProductSlice
                from={4}
                to={productsData.length}
                productsData={productsData}
            />
        </div>
    )
}

export default ProductFeed