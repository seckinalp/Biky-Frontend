import React, { useState, useRef } from 'react';
import './CreatePost.css';
import CategorySelect from '../assets/categoryComponent/CategorySelect';

interface CreatePostProps {
  onClose: () => void;
  onSubmit: (postData: {
    description: string;
    postType: 'socialMedia' | 'sale';
    price: number | '';
    itemCategory: number | undefined;
    isAnonymous: boolean; // Add this line
  }) => void;
}

export interface Category {
  categoryID: number;
  name: string;
  children: Category[];
}

const categoryData: Category[] = [
  {
    categoryID: 1,
    name: "string",
    children: [
      {
        categoryID: 2,
        name: "lesson",
        children: [
          {
            categoryID: 3,
            name: "cs",
            children: [
              { categoryID: 4, name: "cs223", children: [] },
              { categoryID: 5, name: "cs315", children: [] },
              { categoryID: 6, name: "cs319", children: [] }
            ]
          }
        ]
      }
    ]
  }
  // ... other categories
];

const CreatePost: React.FC<CreatePostProps> = ({ onClose, onSubmit }) => {
  const [description, setDescription] = useState<string>('');
  const [postType, setPostType] = useState<'socialMedia' | 'sale'>('socialMedia');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [price, setPrice] = useState<number | ''>('');
  const [images, setImages] = useState<string[]>([]);
  const [imagePreviewIndex, setImagePreviewIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [itemCategory, setItemCategory] = useState<number | undefined>(undefined);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAnonymous(event.target.checked);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      postType,
      price,
      itemCategory,
      isAnonymous, // Include the checkbox value in the submitted data
    });
  };

  const handleItemCategoryChange = (categoryId: number) => {
    setItemCategory(categoryId);
  };

 ;

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


  const handleClose = () => {
    onClose(); 
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  if (!isVisible) return null;
  return (
<div className="create-post">
      <div className="modal-header">
        <h2 className="modal-title">Create a Post</h2>
        <button className="close-button" onClick={handleClose}></button>
      </div>
      <form onSubmit={handleSubmit}>
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
  <div className="character-count">{description.length}/256</div>
  <textarea
    id="description"
    value={description}
    maxLength={256}
    onChange={handleDescriptionChange}
  />
</div>

<div className="form-group checkbox-group">
  <input 
    type="checkbox" 
    id="anonymousCheckbox" 
    name="anonymous"
    checked={isAnonymous}
    onChange={handleCheckboxChange}
  />
  <label htmlFor="anonymousCheckbox">Anonymous</label>
</div>
        {postType === 'sale' && (
          <>
            <div className="form-group">
            
             
             
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                min="0" // Minimum value
                step="0.01" // Only allow integer values
              />
            </div>
             <CategorySelect data={categoryData} onCategoryChange={handleItemCategoryChange} />
          </>
        )}

        <div className="image-upload-section">
          

          
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
      
      <div className="btn-container">
      <button className="button" onClick={triggerFileInput}> 
  <svg className="svgIcon" viewBox="0 0 384 512">
    <path
      d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
    ></path>
  </svg>
</button>
  <button className='btn' type="submit">Publish!</button>
</div>

  {/* ... */}
</form>
    </div>
  );
};

export default CreatePost;
