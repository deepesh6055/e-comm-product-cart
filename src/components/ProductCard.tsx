import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2 hover:bg-gray-100"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{product.category}</span>
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};