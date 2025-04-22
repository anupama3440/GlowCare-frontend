import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/User/ProductCard';
import Header from '../../components/User/Header';
import Banner from '../../components/User/Banner';
import Footer from '../../components/Common/Footer';
import Loader from '../../components/Common/Loader';
import { getHomeProducts } from '../../services/userService';
import { toast } from 'react-toastify';

const data = [
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123123', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123124', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123125', price: 400 },
  { image_url: 'https://png.pngtree.com/thumb_back/fh260/background/20230413/pngtree-makeup-skin-care-products-cosmetics-beauty-photography-advertising-background-image_2218552.jpg', name: 'name1', id: '123126', price: 400 },
]

const Home = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newlyArrivedProducts, setNewlyArrivedProducts] = useState([]);
  const [expensiveProducts, setExpensiveProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    setProducts(data)
    const fetchProdcuts = async () => {
      try {
        const response = await getHomeProducts();
        console.log(response, '-12121')
        if (response.success) {
          setNewlyArrivedProducts(response.newlyArrivedProducts);
          setFeaturedProducts(response.featuredProducts);
          setExpensiveProducts(response.expensiveProducts);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error, 'Error in fetchProducts Home page;');
        toast.error('Something went wrong.');
        throw error;
      }
    }
    fetchProdcuts();

  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Header />
      <Banner />
      <h1 className="text-4xl text-center mb-4 mt-10">Featured Cosmetics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <h2 className="text-3xl text-center mt-12 mb-6">Newly Arrived Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
        {newlyArrivedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <h2 className="text-3xl text-center mt-12 mb-6">Expensive Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-12">
        {expensiveProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Example />
      <Footer />
    </>
  );
};

export default Home;


const stats = [
  { id: 1, name: 'Daily Sales', value: '35,000' },
  { id: 2, name: 'Total Customers', value: '2.5 million' },
  { id: 3, name: 'Products in Inventory', value: '500+' },
];

function Example() {
  return (
    <div
      className="relative bg-cover bg-center py-24 sm:py-32"
      style={{ backgroundImage: 'url(https://png.pngtree.com/background/20230612/original/pngtree-various-makeup-products-lie-on-a-table-on-dark-picture-image_3185889.jpg)' }}
    >
      {/* Add overlay to make text readable */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base text-white">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

