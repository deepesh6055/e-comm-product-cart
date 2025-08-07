import React from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="mb-3">
                <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h2>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};