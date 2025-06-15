import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import './ProductCardSkeleton.css';

interface ProductCardSkeletonProps {
  count?: number;
  mode?: 'grid' | 'compact' | 'list' | 'premium';
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ 
  count = 1, 
  mode = 'grid'
}) => {
  const isCompact = mode === 'compact';
  const isList = mode === 'list';
  const isPremium = mode === 'premium';
  
  return (
    <>
      {Array(count).fill(0).map((_, index) => (
        <div key={index} className="w-full">
          {isPremium ? (
            <div className="premium-product-card">
              {/* Image skeleton */}
              <div className="premium-product-image">
                <div className="premium-skeleton w-full h-full"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="premium-product-content">
                {/* Title */}
                <div className="premium-skeleton w-3/4 h-4 mb-2"></div>
                
                {/* Subtitle */}
                <div className="premium-skeleton w-1/2 h-3 mb-3"></div>
                
                {/* Price */}
                <div className="premium-product-pricing">
                  <div className="premium-skeleton w-12 h-4"></div>
                  <div className="premium-skeleton w-10 h-3 ml-2"></div>
                </div>
                
                {/* Actions */}
                <div className="premium-actions-row">
                  <div className="premium-skeleton w-8 h-3 rounded"></div>
                  <div className="premium-skeleton w-16 h-7 rounded"></div>
                </div>
              </div>
            </div>
          ) : isList ? (
            <Card className="overflow-hidden bg-white shadow-sm border border-gray-100">
              <div className="flex h-full">
                <div className="w-1/3 relative overflow-hidden">
                  <div className="skeleton-loading product-skeleton-image h-full"></div>
                </div>
                <CardContent className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="skeleton-loading product-skeleton-text w-3/4 h-4 mb-2"></div>
                      <div className="skeleton-loading product-skeleton-text w-8 h-3"></div>
                    </div>
                    <div className="skeleton-loading product-skeleton-text w-1/2 h-3 mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="skeleton-loading product-skeleton-text w-16 h-5"></div>
                      <div className="skeleton-loading w-16 h-8 rounded-md"></div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ) : (
            <Card className="h-full border border-gray-100 shadow-sm">
              {/* Image skeleton */}
              <div className="skeleton-loading product-skeleton-compact h-36"></div>
              
              {/* Content skeleton */}
              <CardContent className="p-2">
                {/* Title and Rating */}
                <div className="flex justify-between items-start mb-1.5">
                  <div className="skeleton-loading product-skeleton-text w-3/4 h-3"></div>
                  <div className="skeleton-loading w-8 h-3 rounded"></div>
                </div>
                
                {/* Subtitle */}
                <div className="skeleton-loading product-skeleton-text w-1/2 h-2 mb-3"></div>
                
                {/* Price and button */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="skeleton-loading w-12 h-3.5 rounded"></div>
                  <div className="skeleton-loading w-7 h-7 rounded"></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
