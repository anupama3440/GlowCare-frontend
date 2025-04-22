import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { motion } from 'framer-motion'; 
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the user is an admin or a regular user
    const isAdmin = location.pathname.includes('/admin');

    const handleNavigateHome = () => {
        if (isAdmin) {
            navigate('/admin/dashboard'); // Navigate to the admin dashboard
        } else {
            navigate('/'); // Navigate to the user homepage
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br ">

            <DotLottieReact
                src="https://lottie.host/f844fb99-c9b2-4759-a4e9-a5a8dd7186e2/NEE4QysLoL.lottie"
                loop
                autoplay
                style={{ width: '70%', height: '50%' }}
            />
            <motion.div
                className="flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <p className="text-xl text-gray-700 mb-8">
                    {isAdmin
                        ? "Oops! This admin page doesn't seem to exist. Let's go back to the admin dashboard."
                        : "Oops! The page you're looking for doesn't exist. Let's get you back to the homepage!"}
                </p>
                <motion.button
                    onClick={handleNavigateHome}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    <AiOutlineHome size={28} className="mr-3" />
                    {isAdmin ? "Go to Admin Dashboard" : "Go to Home"}
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
