import React, { useState, useRef } from 'react';
import './CreatePost.css';


const CreatePost = () => {
  const [description, setDescription] = useState<string>('');
  const [postType, setPostType] = useState<'socialMedia' | 'sale'>('socialMedia');
  const [selectedType, setSelectedType] = useState<string>('')
  const [price, setPrice] = useState<number | ''>('');
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviewIndex, setImagePreviewIndex] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPrice(value === '' ? '' : Number(value));
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map((file) => URL.createObjectURL(file));
      setImages((prevImages) => {
        const spaceForNewImages = 4 - prevImages.length;
        const newImagesToAdd = fileArray.slice(0, spaceForNewImages);
        return [...prevImages, ...newImagesToAdd];
      });
      event.target.value = ""; // Clear the file input
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (imagePreviewIndex >= index && imagePreviewIndex > 0) {
      setImagePreviewIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Submit form data logic here
  };
  const handleClose = () => {
    // Logic to handle the closing of the post creation modal
    console.log('Modal closed'); // Replace with actual close logic
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
<div className="create-post">
      <div className="modal-header">
        <h2 className="modal-title">Create a Post</h2>
        <button className="close-button" onClick={handleClose}>&times;</button>
      </div>
      <div className="post-type-buttons">
        <button 
          type="button" 
          onClick={() => setPostType('socialMedia')} 
          className={`post-type-button ${postType === 'socialMedia' ? 'active' : ''}`}
        >
          Social Media Post
        </button>
        <button 
          type="button" 
          onClick={() => setPostType('sale')} 
          className={`post-type-button ${postType === 'sale' ? 'active' : ''}`}
        >
          Sale Post
        </button>
      </div>
      
        <div className="form-group">
          
          <label htmlFor="description">Description</label>
          <span className="character-count">{description.length}/256</span>
          <textarea
            id="description"
            value={description}
            maxLength={256}
            onChange={handleDescriptionChange}
          />
          
        </div>
       
        {postType === 'sale' && (
          <>
            <div className="form-group">
              <label htmlFor="type">Select a Type</label>
              <select id="type" value={selectedType} onChange={handleTypeChange}>
                {/* Option elements */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                min="0" // Minimum value
                step="1" // Only allow integer values
              />
            </div>
          </>
        )}

        <div className="image-upload-section">
          <button type="button" onClick={triggerFileInput}>
            Upload Images!
          </button>
          <input
            type="file"
            id="imageUpload"
            multiple
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*" // Accept only images
          />
        </div>

        {images.length > 0 && (
        <div className="image-preview-section">
          <img src={images[imagePreviewIndex]} alt={`Preview ${imagePreviewIndex + 1}`} />
          <div className="image-preview-info">
            <div className="image-counter">
              {`${imagePreviewIndex + 1}/${images.length}`}
            </div>
            <div className="image-preview-controls">
              <button type="button" onClick={() => handleDeleteImage(imagePreviewIndex)}>Delete</button>
              {images.length > 1 && (
                <>
                  <button type="button" onClick={() => setImagePreviewIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))}>
                    Previous
                  </button>
                  <button type="button" onClick={() => setImagePreviewIndex((prevIndex) => (prevIndex + 1) % images.length)}>
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

        <button type="submit">PUBLISH!</button>
        <form onSubmit={handleSubmit}>
        {/* ... */}
      </form>
      
    </div>
  );
};

export default CreatePost;
