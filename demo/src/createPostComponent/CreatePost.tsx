import React, { useState } from 'react';
import './CreatePost.css';
import '../ButtonStyle.css'

  
const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [book, setBook] = useState('');
  const [type, setType] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const shouldShowPriceField = (category: string): boolean => {
    return ['Second Hand', 'Private Lesson'].includes(category);
  };

  const shouldShowTypeDropdown = (category: string): boolean => {
    return ['Lost Property', 'Trade', 'Borrow'].includes(category);
  };
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'department':
        setDepartment(value);
        break;
      case 'course':
        setCourse(value);
        break;
      case 'book':
        setBook(value);
        break;
      case 'type':
        setType(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission logic goes here
  };

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit}>
        <div className="category-buttons">
          {['Social Media', 'Second Hand', 'Lost Property', 'Trade', 'Borrow', 'Private Lesson'].map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="form-row-up">
          <div className="form-group-up form-group-description">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {shouldShowPriceField(selectedCategory) && (
            <div className="form-group-up form-group-price">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          )}
        </div>

        {shouldShowTypeDropdown(selectedCategory) && (
          <div className="form-row-up">
            <div className="form-group-up">
              <label htmlFor="type">Select a Type</label>
              <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Please select</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                <option value="type3">Type 3</option>
              </select>
            </div>
          </div>
        )}

        {selectedCategory === 'Second Hand' && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Select a Department</label>
              <select name="department" id="department" value={department} onChange={handleSelectChange}>
              <option value="">Select a Department</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="course">Course Code</label>
              <select name="course" id="course" value={course} onChange={handleSelectChange}>
              <option value="">Select a Department</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="book">Select the Book</label>
              <select name="book" id="book" value={book} onChange={handleSelectChange}>
              <option value="">Select a Department</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">Select a Type</label>
              <select name="type" id="type" value={type} onChange={handleSelectChange}>
              <option value="">Select a Department</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </select>
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="imageUpload">Upload Image</label>
          <input type="file" id="imageUpload" onChange={handleImageUpload} />
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="image-preview" />}
        </div>

        <button type="submit" className="publish-button">Publish!</button>
      </form>
    </div>
  );
};

export default CreatePost;

