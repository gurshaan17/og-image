import React, { useState } from 'react';
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './Firebase'; // Adjust the import path if necessary

const ImageMaker = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [firebaseUrl, setFirebaseUrl] = useState('');

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
      const response = await axios.post('https://og-image-backend-f1ma.onrender.com/generate-og-image', formData, {
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

  const handleUploadToFirebase = async () => {
  if (!ogImageUrl) {
    alert('Please generate an image first.');
    return;
  }

  try {
    const fullImageUrl = `https://og-image-backend-f1ma.onrender.com${ogImageUrl}`;
    console.log('Fetching image from:', fullImageUrl);

    const response = await fetch(fullImageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch the image: ${response.statusText}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    const blob = await response.blob();
    console.log('Blob size:', blob.size, 'bytes');

    if (blob.size === 0) {
      throw new Error('Fetched image is empty');
    }

    const storageRef = ref(storage, `og-images/${Date.now()}.png`);
    const uploadResult = await uploadBytes(storageRef, blob);
    console.log('Uploaded file:', uploadResult);

    const url = await getDownloadURL(storageRef);
    setFirebaseUrl(url);
    console.log('Firebase Image URL:', url);
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    alert(`Error uploading image: ${error.message}`);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mb-8"> {/* Increased max width */}
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
      </div>
      {ogImageUrl && (
        <div className="w-full max-w-lg"> {/* Increased max width */}
          <h2 className="text-2xl font-semibold mb-2 text-center">Generated OG Image:</h2>
          <img src={`https://og-image-backend-f1ma.onrender.com${ogImageUrl}`} alt="OG" className="w-full rounded-md" />
          <button
            onClick={handleUploadToFirebase}
            className="w-11/12 mx-auto text-center py-2 px-4 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200 font-semibold text-white flex justify-center items-center" // Changed color to blue
          >
            Generate Link
          </button>
        </div>
      )}
      {firebaseUrl && (
        <div className="w-full max-w-lg mt-4 text-center"> {/* Increased max width */}
          <h2 className="text-xl font-semibold mb-2">Firebase Image URL:</h2>
          <a href={firebaseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400">
            {firebaseUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageMaker;