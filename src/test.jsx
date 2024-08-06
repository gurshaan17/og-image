import React, { useState } from 'react';
import axios from 'axios';

const ImageMaker = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/generate-og-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOgImageUrl(response.data.imageUrl);
      console.log('Generated Image URL:', response.data.imageUrl);
      // Reset form and state
      setTitle('');
      setContent('');
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Image Maker</h1>
        <p className="text-gray-400 text-center mb-6">Create beautiful Open Graph images for your website.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter content"
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">Image (optional)</label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              className="w-full text-white"
            />
            {preview && <img src={preview} alt="Preview" className="mt-2 rounded-md max-h-40" />}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md transition duration-200 font-semibold text-white"
          >
            Generate Image
          </button>
        </form>
        {ogImageUrl && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Generated OG Image:</h2>
            <img src={`http://localhost:3000${ogImageUrl}`} alt="OG" className="w-full rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageMaker;