
import './gallery.css';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from 'react';
import axios from 'axios';


const Reactgallery = () => {
  const [images,setImages] = useState([]);

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
  
  const getImages = async()=>{
    try{
       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}images/getImages`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":'application/json'
        },
       })
       setImages(res.data.message)
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    getImages();
  },[])

  return (
    <div className='gallery-container'>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for images"
          className="search-bar"
        />
      </div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry>
          {images.map((image, i) => (
            <img
              key={i}
              src={image.image}
              className="gallery-image"
              alt={`gallery-img-${i}`}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Reactgallery;
