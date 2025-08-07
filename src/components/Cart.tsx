import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartState } from '../types';

interface CartProps {
  cartState: CartState;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({
  cartState,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!cartState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart ({cartState.itemCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartState.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartState.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">₹{item.product.price.toLocaleString('en-IN')}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartState.items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{cartState.total.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};