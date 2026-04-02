import Home from './routes/Home/Home';

import './App.css';
import { ToastContainer } from 'react-toastify';
import Card from './components/Card';

const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        description:
            'Experience crystal clear sound with advanced noise cancellation.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        buttonText: 'Add to Cart',
    },
    {
        id: 2,
        name: 'Smart Watch',
        description:
            'Track your activity and health with a sleek modern design.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
        buttonText: 'Add to Cart',
    },
    {
        id: 3,
        name: 'Modern Camera',
        description: 'Capture stunning photos with high-quality resolution.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
        buttonText: 'Add to Cart',
    },
    {
        id: 4,
        name: 'Gaming Mouse',
        description: 'High precision mouse designed for pro gamers.',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
        buttonText: 'Add to Cart',
    },
    {
        id: 5,
        name: 'Laptop Stand',
        description: 'Ergonomic stand for better comfort and airflow.',
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
        buttonText: 'Add to Cart',
    },
];

function App() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
                toastClassName="!bg-transparent !shadow-none !p-0"
                bodyClassName="!p-0"
            />
            <Home>
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </Home>
            ;
        </>
    );
}

export default App;
