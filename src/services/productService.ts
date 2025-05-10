import { Product, Category, Review } from '../types';
import { get, post, put, del } from './apiClient';

// Types for API responses
export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductResponse {
  product: Product;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface CategoryResponse {
  category: Category;
}

// Query parameters for product filtering
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}

// Types for API responses
export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
}

// Product service functions
export const productService = {
  // Get all products with optional filtering
  getProducts: async (params?: ProductQueryParams): Promise<ProductsResponse> => {
    try {
      return await get<ProductsResponse>('/products', { params });
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return mock data in case of error (for development)
      return getMockProducts(params);
    }
  },

  // Get a single product by ID
  getProduct: async (id: string): Promise<ProductResponse> => {
    try {
      return await get<ProductResponse>(`/products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      // Return mock data in case of error (for development)
      return getMockProduct(id);
    }
  },
  
  // Get reviews for a product
  getProductReviews: async (productId: string, page = 1, limit = 5): Promise<ReviewsResponse> => {
    try {
      return await get<ReviewsResponse>(`/products/${productId}/reviews`, { params: { page, limit } });
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error);
      // Return mock data in case of error (for development)
      return getMockProductReviews(productId, page, limit);
    }
  },

  // Create a new product (admin only)
  createProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> => {
    return await post<ProductResponse>('/products', productData);
  },

  // Update an existing product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<ProductResponse> => {
    return await put<ProductResponse>(`/products/${id}`, productData);
  },

  // Delete a product (admin only)
  deleteProduct: async (id: string): Promise<void> => {
    return await del<void>(`/products/${id}`);
  },

  // Get all categories
  getCategories: async (): Promise<CategoriesResponse> => {
    try {
      return await get<CategoriesResponse>('/categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return mock data in case of error (for development)
      return getMockCategories();
    }
  },

  // Get a single category by ID or slug
  getCategory: async (idOrSlug: string): Promise<CategoryResponse> => {
    try {
      return await get<CategoryResponse>(`/categories/${idOrSlug}`);
    } catch (error) {
      console.error(`Error fetching category ${idOrSlug}:`, error);
      // Return mock data in case of error (for development)
      return getMockCategory(idOrSlug);
    }
  },
};

// Mock data functions for development/fallback
import { products, categories, reviews } from '../data/mockData';

// Mock function to simulate getting products with filtering
const getMockProducts = (params?: ProductQueryParams): ProductsResponse => {
  let filteredProducts = [...products];
  
  // Apply filters if provided
  if (params) {
    // Filter by category
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === params.category?.toLowerCase());
    }
    
    // Filter by search term
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm));
    }
    
    // Filter by price range
    if (params.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= params.maxPrice!);
    }
    
    // Filter by featured
    if (params.featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.featured === params.featured);
    }
    
    // Sort products
    if (params.sort) {
      switch (params.sort) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
  }
  
  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit
  };
};

// Mock function to get a single product
const getMockProduct = (id: string): ProductResponse => {
  const product = products.find(p => p.id === id);
  
  if (!product) {
    throw new Error(`Product with ID ${id} not found`);
  }
  
  return { product };
};

// Mock function to get all categories
const getMockCategories = (): CategoriesResponse => {
  return { categories };
};

// Mock function to get a single category
const getMockCategory = (idOrSlug: string): CategoryResponse => {
  const category = categories.find(
    c => c.id === idOrSlug || c.slug === idOrSlug
  );
  
  if (!category) {
    throw new Error(`Category with ID or slug ${idOrSlug} not found`);
  }
  
  return { category };
};

// Mock function to get product reviews with pagination
const getMockProductReviews = (productId: string, page = 1, limit = 5): ReviewsResponse => {
  const productReviews = reviews.filter(review => review.productId === productId);
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedReviews = productReviews.slice(startIndex, endIndex);
  
  return {
    reviews: paginatedReviews,
    total: productReviews.length,
    page,
    limit
  };
};