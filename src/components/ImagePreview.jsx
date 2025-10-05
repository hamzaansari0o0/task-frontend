// src/components/ImagePreview.jsx

const ImagePreview = ({ src, alt, className = "" }) => {
  // Default classes for a circular preview
  const defaultClasses = "h-36 w-36 rounded-full object-cover";

  return <img src={src} alt={alt} className={`${defaultClasses} ${className}`} />;
};

export default ImagePreview;