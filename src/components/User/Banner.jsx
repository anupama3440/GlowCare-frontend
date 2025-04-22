import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

function Banner() {

    const navigate = useNavigate();

    const handelClick = () => {
        navigate('/shop');
    }

    return (
        <div className="relative bg-gradient-to-t from-yellow-50 to-yellow-300 text-gray-800 h-screen p-6">
            <div className="container mx-auto px-6 py-16 md:py-14 flex flex-col md:flex-row items-center justify-between h-full">
                {/* Left Section - Text */}
                <div className="max-w-lg gap-4 md:max-w-xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-900">
                        Discover Amazing Deals on Cosmetics!
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-700">
                        Get up to <span className="font-bold text-yellow-800">50% off</span> on your favorite products.
                        Limited time offer. Shop now and glow up!
                    </p>
                    <button onClick={handelClick} className="mt-6 bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                        Shop Now
                    </button>
                </div>

                {/* Right Section - Lottie Animation */}
                <div className="w-full  flex justify-center">
                    <DotLottieReact
                        src="https://lottie.host/fc14fe72-6c28-414c-a6ec-e5a7a404903c/8ny6Qg6Y4t.lottie"
                        loop
                        autoplay
                        width={'100%'}
                        height={'60%'}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
