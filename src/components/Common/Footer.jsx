import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-yellow-200 to-yellow-300 text-black p-8">
      <div className="container mx-auto text-center sm:text-left">
        {/* Company Info */}
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-3xl font-semibold">GlowCare</h2>
            {/* <p className="text-lg">Your go-to place for the finest beauty products.</p> */}
          </div>
          <div className="flex justify-center sm:justify-end space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/shop" className="hover:underline">Shop</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Customer Service</h3>
            <ul>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/returns" className="hover:underline">Returns & Exchanges</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Legal</h3>
            <ul>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <ul>
              <li>Email: support@cosmeticshop.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Beauty St, New York, NY</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white pt-4 flex justify-center">
          <p>&copy; 2025 Cosmetic Shop. All Rights Reserved. </p>
          <p className="text-sm">
             Built with ❤️ by <a href="https://www.yourcompany.com" className="hover:underline">the Company</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
