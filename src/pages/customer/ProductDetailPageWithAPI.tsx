import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/ui/Button';
import { useProduct, useAddToCart, useProductReviews } from '../../contexts/QueryProvider';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPageWithAPI: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewsPage, setReviewsPage] = useState(1);
  const reviewsPerPage = 3;

  // Fetch product data using React Query
  const { 
    data: productData, 
    isLoading, 
    error 
  } = useProduct(productId);
  
  // Fetch product reviews using React Query
  const {
    data: reviewsData,
    isLoading: isLoadingReviews,
    error: reviewsError
  } = useProductReviews(productId, reviewsPage, reviewsPerPage);

  // Add to cart mutation
  const addToCartMutation = useAddToCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <p>Sorry, we couldn't find the product you're looking for.</p>
        </div>
      </div>
    );
  }

  const { product } = productData;

  const handleAddToCart = () => {
    // Use the mutation to add to cart
    addToCartMutation.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          // Open cart drawer after adding item
          dispatch({ type: 'TOGGLE_CART_DRAWER', payload: true });
        },
      }
    );
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
      {/* Loading overlay for add to cart operation */}
      {addToCartMutation.isPending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-center">Adding to cart...</p>
          </div>
        </div>
      )}

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

          {/* Stock status */}
          <div className="mb-6">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.inStock ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 border-r hover:bg-gray-50 disabled:opacity-50"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
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
                disabled={!product.inStock || addToCartMutation.isPending}
              >
                {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
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
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-gray-600">Tags</dt>
                <dd className="col-span-2 text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Additional Information</h3>
            <p className="text-gray-600">
              This product was added to our catalog on {new Date(product.createdAt).toLocaleDateString()} and was last updated on {new Date(product.updatedAt).toLocaleDateString()}.
            </p>
          </div>
        </div>
      </div>

      {/* Error message for add to cart failures */}
      {addToCartMutation.isError && (
        <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded mb-6">
          <p>Error adding product to cart. Please try again.</p>
        </div>
      )}
      
      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        
        {isLoadingReviews && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {reviewsError && (
          <div className="bg-error-50 border border-error-200 text-error-800 px-4 py-3 rounded">
            <p>Error loading reviews. Please try again later.</p>
          </div>
        )}
        
        {reviewsData && reviewsData.reviews.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <p className="text-gray-600">No reviews yet for this product.</p>
            <p className="text-gray-500 text-sm mt-2">Be the first to leave a review!</p>
          </div>
        )}
        
        {reviewsData && reviewsData.reviews.length > 0 && (
          <div>
            <div className="space-y-6">
              {reviewsData.reviews.map((review) => (
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
            
            {/* Pagination */}
            {reviewsData.total > reviewsPerPage && (
              <div className="flex justify-center items-center mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewsPage(prev => Math.max(prev - 1, 1))}
                  disabled={reviewsPage === 1}
                  leftIcon={<ChevronLeft className="h-4 w-4" />}
                >
                  Previous
                </Button>
                
                <div className="mx-4 text-sm text-gray-600">
                  Page {reviewsPage} of {Math.ceil(reviewsData.total / reviewsPerPage)}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReviewsPage(prev => prev + 1)}
                  disabled={reviewsPage >= Math.ceil(reviewsData.total / reviewsPerPage)}
                  rightIcon={<ChevronRight className="h-4 w-4" />}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};