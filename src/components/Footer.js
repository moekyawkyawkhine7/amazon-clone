import React from 'react'

const Footer = () => {
    return (
        <footer className="gap-y-5 text-sm space-y-5 font-normal text-gray-500 py-7 bg-black">
            <div className="w-9/12 gap-y-5 mx-auto grid grid-cols-2 md:grid-cols-3">
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Amazon Web Services
                    </h3>
                    <p>Scalable Cloud</p>
                    <p>Computing Services</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Amazon Fresh
                    </h3>
                    <p>Groceries & More</p>
                    <p>Right To Your Door</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Goodreads
                    </h3>
                    <p>Bood Reviews</p>
                    <p>& Recommendations</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Shopbop
                    </h3>
                    <p>Designer</p>
                    <p>Fashing Brands</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Abe Books
                    </h3>
                    <p>Books, Art</p>
                    <p>& Collectables</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Alexa
                    </h3>
                    <p>Actionable Analytics</p>
                    <p>fot the Web</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        Book Depository
                    </h3>
                    <p>Books With Free</p>
                    <p>Delivery Worldwide</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        IMDb
                    </h3>
                    <p>Movies, TV</p>
                    <p>& Celebrities</p>
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-200">
                        DPReview
                    </h3>
                    <p>Digital</p>
                    <p>Photography</p>
                </div>
            </div>
            <div className="text-center pt-3">
                <p className="text-sm font-semibold">© 1996-2022, Amazon.com, Inc. or its affiliates</p>
            </div>
        </footer>
    )
}

export default Footer