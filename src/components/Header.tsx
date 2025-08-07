import React from 'react';
import { ShoppingCart, Search } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartToggle: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartToggle,
  searchTerm,
  onSearchChange
}) => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopCart
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartToggle}
            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:bg-gray-100 rounded-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};