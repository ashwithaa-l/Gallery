import { useState, useRef } from 'react';
import './upload.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

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
    const navigate = useNavigate();

    if(!token){
        navigate('/login');
    }

    const handleAdd = async () => {

        try {
          console.log('title',title)
          console.log('image',image)
          console.log(import.meta.env.VITE_BASE_URL)
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}images/uploads`,{
                title,
                image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if(res){
              console.log('res',res)
            }
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]); 
      const fileNameSpan = document.getElementById('file-name');
      const file = e.target.files[0];
      if (file) {
        fileNameSpan.textContent = file.name;
      }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <div
                className="upload-container"
                onClick={() => fileInputRef.current.click()}
            >
                <label className="upload-label">Upload Image</label>
                <span id="file-name" className="file-name">
                    Drop or Upload your image
                </span>
                <input
                    type="file"
                    name="image"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </div>
            <button onClick={handleAdd}>Add Image</button>
        </div>
    );
};

export default Upload;
