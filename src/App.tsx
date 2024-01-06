import { useState } from 'react';
import { Product, User } from './types';
import { useCart } from './hooks';
import { MySidebar } from '@components/sideBar/MySidebar';
import Header from '@components/Header';
import { Images } from '@components/Images';
import { ProductInfo } from '@components/Product-info';


function App({ product }: { product: Product; user: User }) {
    const [cart, addToCart] = useCart();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return (
        <div className="flex h-screen overflow-hidden">
            <MySidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

            <div className={`flex flex-col flex-1 transition-all duration-500 ${sidebarVisible ? 'ml-40' : 'ml-0'}`}>
                <Header toggleSidebar={toggleSidebar} />
                <main className="flex-1 overflow-auto">
                    <Images images={product.images} />
                    <ProductInfo product={product} addToCart={addToCart} />
                    {/* Your main content */}
                </main>
                {/* Footer */}
            </div>
        </div>
    );
}

export default App;
