
import { useNavigate } from 'react-router-dom';
import './App.css'
// import Signup from './components/Signup'; 
function App() {

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
  return (
    <>
      
    </>
  )
}

export default App
