import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/Button';
import { products, reviews } from '../../data/mockData';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(r => r.productId === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId: product.id, quantity }
    });
    // Open cart drawer after adding item
    dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? 'border-primary-600' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline">
              {product.compareAtPrice && (
                <span className="text-lg text-gray-500 line-through mr-2">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
            {product.compareAtPrice && (
              <span className="inline-block mt-1 text-sm text-success-600 font-medium">
                Save ${(product.compareAtPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 border-r hover:bg-gray-50"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-3 py-2 border-l hover:bg-gray-50"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  +
                </button>
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                leftIcon={<ShoppingCart className="h-5 w-5" />}
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Heart className="h-5 w-5" />}
              >
                Add to Wishlist
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="h-5 w-5 mr-2" />
              Free shipping on orders over RS 5000
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Shield className="h-5 w-5 mr-2" />
              1-year warranty included
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Specifications</h3>
            <dl className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-gray-600">Brand</dt>
                <dd className="col-span-2 text-gray-900">{product.brand}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-gray-600">SKU</dt>
                <dd className="col-span-2 text-gray-900">{product.sku}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-gray-600">Category</dt>
                <dd className="col-span-2 text-gray-900">{product.category}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {product.tags.map((tag, index) => (
                <li key={index} className="capitalize">{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {productReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  {review.userName}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};