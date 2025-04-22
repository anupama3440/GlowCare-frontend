import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles

const SingleProductDetail = ({ product }) => {
    const images = product.images || [];

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start bg-white p-6 shadow-lg rounded-lg">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    {/* Carousel to display images */}
                    <Carousel
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true} // Auto play
                        emulateTouch={true} // Allow touch swipe
                        dynamicHeight={true} // Dynamically adjust height based on image
                        className="rounded-lg"
                    >
                        {images.map((image, index) => (
                            <div key={index} className="rounded-lg">
                                <Zoom>
                                    <img
                                        src={image}
                                        alt={product.name}
                                        className="w-full h-auto object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
                                    />
                                </Zoom>
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="mt-6 md:mt-0 md:ml-8 flex-1">
                    <h1 className="text-4xl font-semibold mb-4 text-gray-800">{product.name}</h1>
                    <p className="text-2xl font-bold text-blue-600 mb-4">Rs. {product.price}</p>
                    <p className="text-gray-700 text-lg mb-6">{product.description}</p>

                    <div className="flex gap-4">
                        <button
                            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-gray-600 text-white text-lg font-medium rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductDetail;
