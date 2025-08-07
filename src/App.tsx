import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { useCart } from './hooks/useCart';
import { products, categories } from './data/products';
import { Product } from './types';

function App() {
  const {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addToCart(product);
    }
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    toggleCart();
  };

  const handleOrderConfirm = () => {
    clearCart();
    alert('Order placed successfully! Thank you for your purchase.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header
        cartItemCount={cartState.itemCount}
        onCartToggle={toggleCart}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Amazing Products
          </h2>
          <p className="text-gray-600">
            Find the perfect items for your lifestyle with our curated collection
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found. Try adjusting your search or category filter.
            </p>
          </div>
        )}
      </main>

      <Cart
        cartState={cartState}
        onClose={toggleCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={cartState.total}
        onConfirm={handleOrderConfirm}
      />
    </div>
  );
}

export default App;