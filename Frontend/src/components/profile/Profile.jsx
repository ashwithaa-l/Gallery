import { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';

const Profile = () => {
  const [username, setUsername] = useState('Guest');
  const [images, setImages] = useState([]);

  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const token = getCookieValue('token');

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}users/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUsername(res.data.message.username);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}images/getUserimages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setImages(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (title) => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}images/deleteImage`, {
        title: title,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setImages(prevImages => prevImages.filter(image => image.title !== title));
      toast.success('Image deleted successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete image!');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchImages();
  }, []);

  return (
    <div className="profile-ui-container">
      <div className="profile-ui-header">
        <h1 className="profile-ui-username">Username: {username}</h1>
        <p className="profile-ui-post-count">Number of Posts: {images.length}</p>
      </div>
      <div className="profile-ui-gallery">
        {images.map((image, index) => (
          <div className="card" key={index}>
            <div className="card-image-container">
              <img src={image.image} alt="Card" className="card-image" />
            </div>
            <p className="card-title">{image.title}</p>
            <p className="card-des">{image.description}</p>
            <button className="delete-button" onClick={() => handleDelete(image.title)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <Toaster/>
    </div>
  );
};

export default Profile;
