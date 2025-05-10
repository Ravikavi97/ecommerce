import React, { memo } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: boolean;
  onClick?: () => void;
  bordered?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const EnhancedCard: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
  elevation = 'sm',
  hoverEffect = false,
  onClick,
  bordered = true,
  rounded = 'lg',
}) => {
  // Base styles
  const baseStyles = 'bg-white overflow-hidden';
  
  // Padding styles
  const paddingStyles = noPadding ? '' : 'p-6';
  
  // Elevation/shadow styles with improved visual hierarchy
  const elevationStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };
  
  // Border styles
  const borderStyles = bordered ? 'border border-gray-200' : '';
  
  // Rounded corner styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };
  
  // Hover effect styles
  const hoverStyles = hoverEffect 
    ? 'transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1'
    : '';
  
  // Cursor style if onClick is provided
  const cursorStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`
        ${baseStyles}
        ${paddingStyles}
        ${elevationStyles[elevation]}
        ${borderStyles}
        ${roundedStyles[rounded]}
        ${hoverStyles}
        ${cursorStyles}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

// Enhanced card header component
interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

const EnhancedCardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  action,
  className = '',
}) => {
  return (
    <div className={`flex justify-between items-start mb-4 ${className}`}>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Enhanced card content component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const EnhancedCardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Enhanced card footer component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const EnhancedCardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Enhanced card image component with lazy loading
interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2';
}

const EnhancedCardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '16:9',
}) => {
  // Aspect ratio styles
  const aspectRatioStyles = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
  };

  return (
    <div className={`overflow-hidden ${aspectRatioStyles[aspectRatio]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
};

// Export memoized components for better performance
export const Card = memo(EnhancedCard);
export const CardHeader = memo(EnhancedCardHeader);
export const CardContent = memo(EnhancedCardContent);
export const CardFooter = memo(EnhancedCardFooter);
export const CardImage = memo(EnhancedCardImage);