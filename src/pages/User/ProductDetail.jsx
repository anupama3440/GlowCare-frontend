import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/User/Header';
import SingleProductDetail from '../../components/User/SingleProductDetail';
import ProductCard from '../../components/User/ProductCard';
import Footer from '../../components/Common/Footer';


const data = [
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123123', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123123', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123123', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123123', price: 400 },
]

const products = [
  {
    id: 1,
    name: 'Product 1',
    images: ['https://www.pharmaadda.in/wp-content/uploads/2023/05/Cosmetic-Product-List-For-Business-Opportunity.jpg', 'https://www.pharmaadda.in/wp-content/uploads/2023/05/Cosmetic-Product-List-For-Business-Opportunity.jpg'], // Array of product images
    price: 1000,
    description: 'Description of product 1'
  },
  {
    id: 2,
    name: 'Product 2',
    images: ['https://www.pharmaadda.in/wp-content/uploads/2023/05/Cosmetic-Product-List-For-Business-Opportunity.jpg', 'https://www.pharmaadda.in/wp-content/uploads/2023/05/Cosmetic-Product-List-For-Business-Opportunity.jpg'],
    price: 2000,
    description: 'Description of product 2'
  },
  // Add more products here
];

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(
    products.find((p) => p.id === parseInt(productId))
  );

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <SingleProductDetail product={product} />
      </div>
      <h1 className="text-4xl text-center mb-4 mt-10">Similar Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
