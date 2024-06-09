
import './gallery.css';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiCloseLargeLine} from "react-icons/ri";
import { GrPrevious,GrNext } from "react-icons/gr";


const Reactgallery = () => {
  const [data,setData]=useState({img:'',i:0})
  const [images,setImages] = useState([]);
const viewImage=(img,i)=>{
 setData({img,i})
}
const imgAction=(action)=>{
  let i=data.i;
  if (action === 'next-img' && i < images.length - 1) {
    setData({ img: images[i + 1].image, i: i + 1 });
  }
  if (action === 'prev-img' && i > 0) {
    setData({ img: images[i - 1].image, i: i - 1 });
  }
  
  if(!action){
    setData({img:'',i:0})
  }
}
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
    <>
    <div className='gallery-container'>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for images"
          className="search-bar"
        />
        {data.img &&<div className='display-container'>
          <button className='close' onClick={()=>imgAction()}><RiCloseLargeLine />
          </button>
          <button className='previous' onClick={()=>imgAction('pre-img')}><GrPrevious /></button>
          <button className='next' onClick={()=>imgAction('next-img')}><GrNext /></button>
          <img src={data.img} className="flex-container"></img>
          </div>}
      </div>
      <div className='img-container'> 
        <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry gutter='13px'>
          {images.map((image, i) => (
            <img
              key={i}
              src={image.image}
              className="gallery-image"
              alt={`gallery-img-${i}`}
              onClick={()=>viewImage(image.image,i)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry></div>
      </div>
    </>
  );
}

export default Reactgallery;
