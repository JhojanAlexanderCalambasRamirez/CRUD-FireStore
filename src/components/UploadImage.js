// src/components/UploadImage.js
import React, { useState, useEffect } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const auth = getAuth();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select an image to upload');
      return;
    }
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to upload an image');
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      
      await addDoc(collection(db, 'users'), {
        name: name,
        imageUrl: url,
        uid: user.uid
      });

      alert('Image uploaded successfully');
      fetchImages(); // Refresh the list of images
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const fetchImages = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const imagesData = [];
    querySnapshot.forEach((doc) => {
      imagesData.push({ ...doc.data(), id: doc.id });
    });
    setImages(imagesData);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (docId, fileUrl) => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please sign in to delete an image');
      return;
    }

    const imageRef = ref(storage, fileUrl);

    try {
      await deleteObject(imageRef);
      await deleteDoc(doc(db, 'users', docId));
      alert('Image and document deleted successfully');
      fetchImages(); // Refresh the list of images
    } catch (err) {
      console.error('Error deleting image or document:', err);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" />
          <p>{name}</p>
        </div>
      )}
      <div className="uploaded-images">
        {images.map((img) => (
          <div key={img.id}>
            <img src={img.imageUrl} alt={img.name} />
            <p>{img.name}</p>
            <button onClick={() => handleDelete(img.id, img.imageUrl)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
